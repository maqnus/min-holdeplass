import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import NextArrivals from "../../components/NextArrivals/NextArrivals";
import JourneyWrapper from "../../hooks/journeyContext";
import { ArrayOfStops } from "../../utils/navigation";
import styles from './Stop.module.scss'

const Stop = () => {
    const router = useRouter()
    const { name } = router.query
    const [isLoading, setIsLoading] = useState(true);
    const currentStop = ArrayOfStops.find((stop) => stop.name.toLocaleLowerCase().split(' ').join('-').split('/').join('-') === name);
    
    useEffect(() => {
        console.log(currentStop ? currentStop.name : 'No stop found');
        setIsLoading(currentStop === undefined);
    }, [currentStop])

    if (isLoading) {
        return (
            <Layout>
                <div className="has-text-centered">
                    <span className={`material-icons ${styles.rotate}`}>
                        autorenew
                    </span>
                </div>
            </Layout>
        )
    }
    return (
        <JourneyWrapper numberOfDepartures={17} stopPlace={ArrayOfStops.find((stop) => stop.name.toLocaleLowerCase().split(' ').join('-').split('/').join('-') === name) || {id: 'NSR:StopPlace:4000', name: 'Jernbanetorget'}}>
            <Layout>
                <NextArrivals />
            </Layout>
        </JourneyWrapper>
    )
    
}

export default Stop;
