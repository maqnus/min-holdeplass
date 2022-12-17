import Select from 'react-select'
import { useJourneyContext } from '../../hooks/journeyContext';
import { Controller, useForm } from "react-hook-form";
import { ArrayOfStops } from '../../utils/navigation';
import { useFlags } from 'flagsmith/react';

const Navigation = () => {
    const {getStopPlace} = useJourneyContext();
    const { control } = useForm();

    const flags = useFlags(['can_see_stop_place_selector', 'can_see_get_stop_place']);
    
    return (
        <>
            {flags.can_see_stop_place_selector.enabled && (
                <Controller
                    name={"stopPlace"}
                    control={control}
                    render={({ field: { onBlur } }) => {
                        return (
                            <Select
                                options={ArrayOfStops.map(stopPlace => ({value: stopPlace.id, label: stopPlace.name}))}
                                isSearchable={true}
                                onChange={(item) => window.location.href = `${window.location.origin}/s/${item?.label?.toString().toLocaleLowerCase().split(' ').join('-').split('/').join('-')}`}
                                onBlur={onBlur}
                            />
                        );
                    }}
                />
            )}
            {flags.can_see_get_stop_place.enabled && (
                <button onClick={getStopPlace}>getStopDate</button>
            )}
        </>
    )
}
export default Navigation;
