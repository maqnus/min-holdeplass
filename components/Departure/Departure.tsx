import styles from './Departure.module.scss';
import { Temporal } from '@js-temporal/polyfill';

type ArrivalTime = string | null; 

interface DelayInfoProps {
    aimedArrivalTime: ArrivalTime;
    expectedArrivalTime: ArrivalTime;
}

const onTime = ({aimedArrivalTime, expectedArrivalTime}: DelayInfoProps) => {
    if (!(aimedArrivalTime || expectedArrivalTime) || (aimedArrivalTime || expectedArrivalTime) === (null || undefined)) return false;
    return aimedArrivalTime === aimedArrivalTime;
};

interface DepartureProps {
    forBoarding: boolean,
    id: string,
    shortTitle: string,
    longTitle: string,
    aimedArrivalTime: string,
    expectedArrivalTime: string,
}

const Departure = ({
    forBoarding,
    id,
    shortTitle,
    longTitle,
    aimedArrivalTime,
    expectedArrivalTime,
}: DepartureProps) => {
    // Temporal is a new API for working with dates and times
    // https://tc39.es/proposal-temporal/docs/
    // DO NOT USE THIS IN PRODUCTION
    const now = Temporal.PlainDateTime.from(Temporal.Now.zonedDateTimeISO('Europe/Oslo').toString());
    const then = Temporal.PlainDateTime.from(expectedArrivalTime);
    const timeUntilExpectedDeparture = now.until(then, { smallestUnit: 'minute' }).minutes;
    const isDelayed = !onTime({aimedArrivalTime, expectedArrivalTime});
    return (
        <details className={`${styles.arrival} ${isDelayed ? styles.isDelayed : ''}`}>
            <summary className={styles.summary}>
                <span className={`materialIcon ${styles.icon}`}>
                    {forBoarding ? 'directions_bus' : 'bus_alert'}
                </span>
                <span className={styles.id}>
                    {id?.split(':')[2]}
                </span>
                <span className={`is-hidden-mobile ${styles.longTitle}`}>
                    {longTitle}
                </span>
                <span className={`is-hidden-tablet ${styles.shortTitle}`}>
                    {shortTitle}
                </span>
                <span className={styles.time}>
                    {(timeUntilExpectedDeparture <= 0) ? <span>nå</span> : <span>{timeUntilExpectedDeparture} min</span>}
                </span>
                <span className={`is-hidden-mobile ${styles.state}`}>
                    {isDelayed ? 'Forsinket' : 'I rute'}
                </span>
            </summary>
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    innhold
                </div>
            </div>
        </details>
    );
}

export default Departure;