import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";
import { departureBoard } from "./api/queries";
import client from "./client";

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
            name: string;
            transportMode: string;
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
    expectedArrivalTime: string | null;
    expectedDepartureTime: string | null;
    forAlighting: boolean;
    forBoarding: boolean;
    quay: Quay;
    realtime: boolean;
    serviceJourney: ServiceJourney;
}

interface JourneyContextValue {
    estimatedCalls: EstimatedCall[];
    stopPlaceName: string | undefined;
}

const JourneyContext = createContext<JourneyContextValue>({
    estimatedCalls: [],
    stopPlaceName: undefined,
});

const JourneyWrapper = ({children}: PropsWithChildren<unknown>) => {
    // useRef is used to store a value that persists between renders
    const getData = useRef(true);
    const [isGettingData, setIsGettingData] = useState(false);
    const [estimatedCalls, setEstimatedCalls] = useState<EstimatedCall[]>([]);
    const [stopPlaceName, setStopPlaceName] = useState<string | undefined>();

    const getDepartureData = useCallback(() => {
        if (isGettingData) return;
        client.fetch({
            query: departureBoard,
            variables: { stopPlaceId: 'NSR:StopPlace:4000' }
        }).then(({data}) => {
            console.log(data);
            setEstimatedCalls(data.stopPlace.estimatedCalls);
            setStopPlaceName(data.stopPlace.name);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            setTimeout(() => {
                setIsGettingData(false);
                getDepartureData();
            }, 10000);
        });
    }, [isGettingData]);

    useEffect(() => {
        // This is a hack to prevent the useEffect from running on every render
        if (getData.current) {
            getData.current = false;
            getDepartureData();
        }
    }, [getDepartureData]);
    
    return (
        <JourneyContext.Provider value={{
            estimatedCalls,
            stopPlaceName,
        }}>
            {children}
        </JourneyContext.Provider>
    );
};

export const useJourneyContext = () => {
    return useContext(JourneyContext);
};

export default JourneyWrapper;