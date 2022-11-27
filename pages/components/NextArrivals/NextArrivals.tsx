import { useJourneyContext } from "../../journeyContext";
import { Temporal } from '@js-temporal/polyfill';
import styles from './NextArrivals.module.scss';

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

const TimeToDepartureText = ({timeTilExcpectedArrival}: {timeTilExcpectedArrival: any}) => (timeTilExcpectedArrival <= 0) ? <span>nå</span> : <span>{timeTilExcpectedArrival} min</span>;

const DelayInfo = ({aimedArrivalTime, expectedArrivalTime}: DelayInfoProps) => {
    if (!(aimedArrivalTime || expectedArrivalTime) || (aimedArrivalTime || expectedArrivalTime) === (null || undefined)) return <></>;
    const ata = Temporal.PlainDateTime.from(aimedArrivalTime as string);
    const eta = Temporal.PlainDateTime.from(expectedArrivalTime as string);
    const diff = eta.subtract({ days: ata.day, hours: ata.hour, minutes: ata.minute, seconds: ata.second, milliseconds: ata.millisecond, microseconds: ata.microsecond, nanoseconds: ata.nanosecond });
    return <span>er {getDifferencFromZonedTemporalISODates({from: diff, to: ata})} min forsinket</span>;
}

const NextArrivals = () => {
    const {estimatedCalls} = useJourneyContext();
    const getTimeTo = (expectedArrivalTime: any) => getDifferencFromZonedTemporalISODates({from: Temporal.Now.zonedDateTimeISO('Europe/Oslo').toString(), to: expectedArrivalTime});

    return (
        <div>
            <div className={`${styles.card} ${styles.dark}`}>
                <div className={styles.nextArrivals}>
                    <ul className={styles.list}>
                        {
                            estimatedCalls.slice(0,2)?.map((journey, key) => (
                                <li key={key}>
                                    <div className={`${styles.arrival} ${styles.dark}`}>
                                        <span className={styles.materialIcon}>directions_bus</span>
                                        <span className={styles.lineId}>{journey?.serviceJourney?.journeyPattern?.line?.id?.split(':')[2]}</span>
                                        <span className={styles.frontText}>{journey?.destinationDisplay?.frontText}</span>
                                        <span className={styles.eta}><TimeToDepartureText timeTilExcpectedArrival={getTimeTo(journey.expectedArrivalTime)} /></span>
                                    </div>
                                    {/* <DelayInfo aimedArrivalTime={journey.aimedArrivalTime} expectedArrivalTime={journey.expectedArrivalTime} /> */}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.card}>
                <ul className={styles.list}>
                    {
                        estimatedCalls.slice(2,estimatedCalls.length)?.map((journey, key) => (
                            <li key={key}>
                                <div className={`${styles.arrival} ${styles.light}`}>
                                    <span className={styles.materialIcon}>directions_bus</span>
                                    <span className={styles.lineId}>{journey?.serviceJourney?.journeyPattern?.line?.id?.split(':')[2]}</span>
                                    <span className={styles.frontText}>{journey?.destinationDisplay?.frontText}</span>
                                    <span className={styles.eta}><TimeToDepartureText timeTilExcpectedArrival={getTimeTo(journey.expectedArrivalTime)} /></span>
                                </div>
                                {/* <DelayInfo aimedArrivalTime={journey.aimedArrivalTime} expectedArrivalTime={journey.expectedArrivalTime} /> */}
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/* <div className={styles.delay}>
                <div className={styles.marquee}>
                    <ul className={styles.list}>
                        {
                            estimatedCalls.slice(0,2)?.map((journey, key) => (
                                <li key={key}>
                                    <span className={styles.lineId}>{journey?.serviceJourney?.journeyPattern?.line?.id?.split(':')[2]}</span>{' '}
                                    <span className={styles.frontText}>{journey?.destinationDisplay?.frontText}</span>
                                    <DelayInfo aimedArrivalTime={journey.aimedArrivalTime} expectedArrivalTime={journey.expectedArrivalTime} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div> */}
        </div>
    )
}

export default NextArrivals;
