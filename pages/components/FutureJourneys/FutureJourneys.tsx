import { useEffect } from "react";
import { useJourneyContext } from "../../journeyContext";
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';


const FutureJourneys = () => {
    const {futureJourneys} = useJourneyContext();

    const remainingMinutesUntil = (expectedDeparture: string) => {
        
        const now = Temporal.Now.plainDateTimeISO()
        console.log(now.until(Temporal.PlainDateTime.from(expectedDeparture)).total({ unit: 'minutes' }));
        
        return now.until(Temporal.PlainDateTime.from(expectedDeparture), { smallestUnit: 'minute' }).total({ unit: 'minutes' });
    }
    
    useEffect(() => {
        console.log(futureJourneys);
    }, [futureJourneys]);
    
    return (
        <>
            <h2>Neste fire busser &rarr;</h2>
            <ul>
                {
                    futureJourneys?.estimatedCalls?.map((journey, key) => (
                        <li key={key}>
                            <h3>{journey?.serviceJourney?.line?.name}</h3>
                            <p>Om {remainingMinutesUntil(journey?.expectedDepartureTime)} min</p>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default FutureJourneys;
