import { useJourneyContext } from "../../journeyContext";
import { Temporal, } from '@js-temporal/polyfill';

type JourneyDateString = string | null; 

interface DelayInfoProps {
    aimedArrivalTime: JourneyDateString;
    expectedArrivalTime: JourneyDateString;
}

const getDifferencFromZonedTemporalISODates = ({from, to}: any): string => {
    if (!to || to === undefined) return '';
    const now = Temporal.PlainDateTime.from(from);
    const then = Temporal.PlainDateTime.from(to);
    return now.until(then, { smallestUnit: 'minute' }).minutes.toString();
}

const TimeToDeparture = ({timeTilExcpectedArrival}: {timeTilExcpectedArrival: any}) => (timeTilExcpectedArrival < 0) ? <span>Kommer nå</span> : <span>Kommer om {timeTilExcpectedArrival} min</span>;

const DelayInfo = ({aimedArrivalTime, expectedArrivalTime}: DelayInfoProps) => {
    if (!(aimedArrivalTime || expectedArrivalTime) || (aimedArrivalTime || expectedArrivalTime) === (null || undefined)) return <></>;
    const ata = Temporal.PlainDateTime.from(aimedArrivalTime as string);
    const eta = Temporal.PlainDateTime.from(expectedArrivalTime as string);
    const diff = eta.subtract({ days: ata.day, hours: ata.hour, minutes: ata.minute, seconds: ata.second, milliseconds: ata.millisecond, microseconds: ata.microsecond, nanoseconds: ata.nanosecond });
    return <span>{getDifferencFromZonedTemporalISODates({from: diff, to: ata})} min forsinket</span>;
}

const FutureJourneys = () => {
    const {estimatedCalls} = useJourneyContext();
    const getTimeTo = (expectedArrivalTime: any) => getDifferencFromZonedTemporalISODates({from: Temporal.Now.zonedDateTimeISO('Europe/Oslo').toString(), to: expectedArrivalTime});

    return (
        <>
            <h2>Neste fire busser &rarr;</h2>
            <ul>
                {
                    estimatedCalls.slice(0,2)?.map((journey, key) => (
                        <li key={key}>
                            <h3>
                                <span>{journey?.serviceJourney?.journeyPattern?.line?.id?.split(':')[2]}{' '}</span>
                                <span>{journey?.destinationDisplay?.frontText}</span>
                            </h3>
                            <TimeToDeparture timeTilExcpectedArrival={getTimeTo(journey.expectedArrivalTime)} />
                            <br />
                            <DelayInfo aimedArrivalTime={journey.aimedArrivalTime} expectedArrivalTime={journey.expectedArrivalTime} />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default FutureJourneys;
