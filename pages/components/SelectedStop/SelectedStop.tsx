import { useJourneyContext } from "../../journeyContext";

const SelectedStop = () => {
    const {futureJourneys} = useJourneyContext();
    
    if (!futureJourneys) {
        return <></>;
    }

    return (
        <div>
            <h1>{futureJourneys.name}</h1>
        </div>
    )
}

export default SelectedStop;