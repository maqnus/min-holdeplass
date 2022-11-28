import styles from './Departure.module.scss';
import { Temporal } from '@js-temporal/polyfill';

interface DepartureProps {
    forBoarding: boolean,
    publicCode: string,
    shortTitle: string,
    longTitle: string,
    aimedArrivalTime: string,
    expectedArrivalTime: string,
    transportMode: string,
    presentation: {
        colour: string,
        textColor: string,
    },
}

const Departure = ({
    forBoarding,
    publicCode,
    shortTitle,
    longTitle,
    aimedArrivalTime,
    expectedArrivalTime,
    transportMode,
    presentation,
}: DepartureProps) => {
    // Temporal is a new API for working with dates and times
    // https://tc39.es/proposal-temporal/docs/
    // DO NOT USE THIS IN PRODUCTION
    const now = Temporal.PlainDateTime.from(Temporal.Now.zonedDateTimeISO('Europe/Oslo').toString());
    const then = Temporal.PlainDateTime.from(expectedArrivalTime);
    const timeUntilExpectedDeparture = now.until(then, { smallestUnit: 'minute' }).minutes;
    const delayedMinutes = Temporal.PlainDateTime.from(aimedArrivalTime).until(then, { smallestUnit: 'minute' }).minutes;
    return (
        <details className={`${styles.arrival} ${delayedMinutes ? styles.isDelayed : ''}`}>
            <summary className={styles.summary}>
                <span className={`materialIcon ${styles.icon}`}>
                    {transportMode === 'bus' && (
                        <>{forBoarding ? 'directions_bus' : 'bus_alert'}</>
                    )}
                </span>
                <span className={styles.publicCode} style={{'backgroundColor': `#${presentation?.colour}`, 'color': `#${presentation?.textColor}`}}>
                    {publicCode}
                </span>
                <span className={styles.shortTitle}>
                    {shortTitle}
                </span>
                <span className={`${styles.time} ${delayedMinutes ? styles.isDelayed : ''}`}>
                    {(timeUntilExpectedDeparture <= 0) ? <span>nå</span> : <span>{timeUntilExpectedDeparture} min</span>}
                </span>
                <span className={`is-hidden-mobile ${styles.state} ${delayedMinutes ? styles.isDelayed : ''}`}>
                    {delayedMinutes ? 'Forsinket' : 'I rute'}
                </span>
            </summary>
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <h2>{longTitle}</h2>
                    <ul>
                        {delayedMinutes <= 0 && (
                            <li>
                                <p>Status: I rute</p>
                            </li>
                        )}
                        {delayedMinutes > 0 && (
                            <li>
                                <p>Status: Forsinket {delayedMinutes} min</p>
                            </li>
                        )}
                        <li>
                            <p>Planlagt ankomst: {Temporal.PlainDateTime.from(aimedArrivalTime).toLocaleString()}</p>
                        </li>
                        <li>
                            <p>Forventet ankomst: {then.toLocaleString()}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </details>
    );
}

export default Departure;