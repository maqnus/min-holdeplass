import { useJourneyContext } from "../../journeyContext";

const SelectedStop = () => {
    const {stopPlaceName} = useJourneyContext();
    
    if (!stopPlaceName) {
        return <></>;
    }

    return (
        <div>
            <h1>{stopPlaceName}</h1>
        </div>
    )
}

export default SelectedStop;