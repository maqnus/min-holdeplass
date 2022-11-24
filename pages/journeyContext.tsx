import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { stopPlace } from "./api/enturApi";
import enturClient from "./enturClient";

interface EstimatedCall {
    actualArrivalTime: string;
    actualDepartureTime: string;
    date: string;
    destinationDisplay: {
        frontText: string;
    }
    expectedDepartureTime: string;
    realtime: boolean;
    serviceJourney: {
        line: {
            name: string;
            publicCode: string;
        }
    }
}

interface JourneyContextValue {
    futureJourneys: EstimatedCall[];
}

const JourneyContext = createContext<JourneyContextValue>({
    futureJourneys: [],
});

const JourneyWrapper = ({children}: PropsWithChildren<unknown>) => {
    const [futureJourneys, setFutureJourneys] = useState<EstimatedCall[]>([]);

    useEffect(() => {
        enturClient.fetch(stopPlace).then(({data}) => {
            console.log(data);
            setFutureJourneys(data.stopPlace);
        });
        // const delay = 6000;
        // (function loop() {
        //     setTimeout(() => {
        //         enturClient.fetch(stopPlace).then(({data}) => {
        //             console.log(data);
        //             setFutureJourneys(data.stopPlace);
        //         });
         
        //        loop();
        //    }, delay);
        //  })();
    }, []);
    
    return (
        <JourneyContext.Provider value={{
            futureJourneys
        }}>
            {children}
        </JourneyContext.Provider>
    );
};

export const useJourneyContext = () => {
    return useContext(JourneyContext);
};

export default JourneyWrapper;