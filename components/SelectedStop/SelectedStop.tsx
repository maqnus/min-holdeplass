import { useJourneyContext } from "../../hooks/journeyContext";

const SelectedStop = () => {
    const {stopPlace} = useJourneyContext();
    
    if (!stopPlace?.name) {
        return <></>;
    }

    return (
        <div>
            <h1>{stopPlace.name}</h1>
        </div>
    )
}

export default SelectedStop;
