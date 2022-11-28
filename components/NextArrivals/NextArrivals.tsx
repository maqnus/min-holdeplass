import { useJourneyContext } from "../../hooks/journeyContext";
import styles from './NextArrivals.module.scss';
import Departure from "../Departure/Departure";

const NextArrivals = () => {
    const {estimatedCalls} = useJourneyContext();
    if (estimatedCalls.length <= 0) {
        return (
            <div className="has-text-centered">
                <span className={`material-icons ${styles.rotate}`}>
                    autorenew
                </span>
            </div>
        );
    }
    return (
        <section className={`section scrollBox ${styles.section}`}>
            <div className={styles.card}>
                <ul className={styles.list}>
                    {
                        estimatedCalls?.map((journey, key) => (
                            <li key={key}>
                                <Departure
                                    forBoarding={journey.forBoarding}
                                    publicCode={journey?.serviceJourney?.journeyPattern?.line?.publicCode}
                                    shortTitle={journey?.destinationDisplay?.frontText}
                                    longTitle={journey?.serviceJourney?.journeyPattern?.line?.name}
                                    aimedArrivalTime={journey.aimedArrivalTime}
                                    expectedArrivalTime={journey.expectedArrivalTime}
                                    transportMode={journey?.serviceJourney?.journeyPattern?.line?.transportMode}
                                    presentation={journey?.serviceJourney?.journeyPattern?.line?.presentation}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default NextArrivals;
