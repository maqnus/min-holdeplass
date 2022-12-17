import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";
import { departureQuery, stopQuery } from "../pages/api/enturAPI/queries";
import client from "../pages/api/enturAPI/client";
import { ArrayOfStops } from "../utils/navigation";

interface DestinationDisplay {
    frontText: string;
}

interface Quay {
    id: string;
    name: string;
}

interface ServiceJourney {
    journeyPattern: {
        line: {
            id: string;
            publicCode: string;
            name: string;
            transportMode: string;
            presentation: {
                colour: string;
                textColor: string;
            }
        }
    };
}

interface EstimatedCall {
    actualArrivalTime: string | null;
    actualDepartureTime: string | null;
    aimedArrivalTime: string;
    aimedDepartureTime: string;
    date: string;
    destinationDisplay: DestinationDisplay;
    expectedArrivalTime: string;
    expectedDepartureTime: string;
    forAlighting: boolean;
    forBoarding: boolean;
    quay: Quay;
    realtime: boolean;
    serviceJourney: ServiceJourney;
}

interface JourneyContextValue {
    estimatedCalls: EstimatedCall[];
    loadingEstimatedCalls: boolean;
    stopPlaceName: string | undefined;
    getStopPlace: () => void;
    isGettingStopData: boolean;
    storedStopData: {id: StopPlaceId, name: StopPlaceName}[]
}

const JourneyContext = createContext<JourneyContextValue>({
    estimatedCalls: [],
    loadingEstimatedCalls: false,
    stopPlaceName: undefined,
    getStopPlace: () => {},
    isGettingStopData: false,
    storedStopData: [],
});

type StopPlaceId = string;
type StopPlaceName = string;

export interface StopPlace {
    id: StopPlaceId;
    name: StopPlaceName;
    estimatedCalls?: EstimatedCall[];
}

interface JourneyWrapperProps {
    numberOfDepartures?: number;
    stopPlace: StopPlace;
}

const JourneyWrapper = ({numberOfDepartures, stopPlace, children}: PropsWithChildren<JourneyWrapperProps>) => {
    // useRef is used to store a value that persists between renders
    const [isGettingDepartureData, setIsGettingDepartureData] = useState(false);
    const [isGettingStopData, setIsGettingStopData] = useState(false);
    const [storedStopData, setStoredStopData] = useState<{id: StopPlaceId, name: StopPlaceName}[]>([]);
    const tempStopNr = useRef(3027);

    const [estimatedCalls, setEstimatedCalls] = useState<EstimatedCall[]>([]);
    const [stopPlaceName, setStopPlaceName] = useState<string | undefined>(undefined);
    const [loadingEstimatedCalls, setLoadingEstimatedCalls] = useState(false);

    const getStopPlace = useCallback(() => {
        if (isGettingStopData) return;
        const controller = new AbortController();
        const signal = controller.signal;
        function getRandomArbitrary(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }
        client.fetch({
            query: stopQuery,
            variables: {
                stopPlaceId: "NSR:StopPlace:"+tempStopNr.current,
            },
            signal,
        }).then(({data}) => {
            const {id, name} = data.stopPlace;
            if (id && name) {
                setStoredStopData(prev => [...prev, {id, name}]);
            } else {
                return;
            }
        })
        .catch((error) => {
            if (error.name === "AbortError") {
                console.log("Aborted");
            } else {
                console.error(error);
            }
        })
        .finally(() => {
            setIsGettingStopData(false);
            if (tempStopNr.current > 5000) return;
            tempStopNr.current = tempStopNr.current +1;
            console.log('get ready for another stop ' + tempStopNr.current);
            const timeout = setTimeout(() => {
                getStopPlace();
            }, getRandomArbitrary(1, 200));
            return () => {
                clearTimeout(timeout)
                controller.abort();
            };
        });
    }, [isGettingStopData, tempStopNr]);

    useEffect(() => {
        if (storedStopData.length > 0) {
            console.log(storedStopData);
        }
    }, [storedStopData]);

    const getDepartureData = useCallback(() => {
        if (isGettingDepartureData || !stopPlace.id) return;
        const controller = new AbortController();
        const signal = controller.signal;
        setLoadingEstimatedCalls(true);
        client.fetch({
            query: departureQuery,
            variables: {
                stopPlaceId: stopPlace.id,
                numberOfDepartures: numberOfDepartures,
            },
            signal,
        }).then(({data}) => {
            setEstimatedCalls(data.stopPlace.estimatedCalls);
            setStopPlaceName(data.stopPlace.name);
        })
        .catch((error) => {
            if (error.name === "AbortError") {
                console.log("Aborted");
            } else {
                console.error(error);
            }
        })
        .finally(() => {
            setLoadingEstimatedCalls(false);
            const timeout = setTimeout(() => {
                setIsGettingDepartureData(false);
                getDepartureData();
            }, 60 * 500);
            return clearTimeout(timeout);
        });
    }, [isGettingDepartureData, numberOfDepartures, stopPlace.id]);

    useEffect(() => {
        getDepartureData();
    }, [getDepartureData]);
    
    return (
        <JourneyContext.Provider value={{
            estimatedCalls,
            loadingEstimatedCalls,
            stopPlaceName,
            getStopPlace,
            isGettingStopData,
            storedStopData,
        }}>
            {children}
        </JourneyContext.Provider>
    );
};

export const useJourneyContext = () => {
    return useContext(JourneyContext);
};

export default JourneyWrapper;
