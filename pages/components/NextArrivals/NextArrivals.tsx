import { useJourneyContext } from "../../journeyContext";
import styles from './NextArrivals.module.scss';
import Departure from "../Departure/Departure";

const NextArrivals = () => {
    const {estimatedCalls} = useJourneyContext();
    return (
        <div className={`${styles.card} ${styles.dark}`}>
            <ul className={styles.list}>
                {
                    estimatedCalls?.map((journey, key) => (
                        <li key={key}>
                            <Departure
                                forBoarding={journey.forBoarding}
                                id={journey?.serviceJourney?.journeyPattern?.line?.id}
                                shortTitle={journey?.destinationDisplay?.frontText}
                                longTitle={journey?.serviceJourney?.journeyPattern?.line?.name}
                                aimedArrivalTime={journey.aimedArrivalTime}
                                expectedArrivalTime={journey.expectedArrivalTime}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NextArrivals;
