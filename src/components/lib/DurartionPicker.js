import React from "react";
import styled from "styled-components";
import { clamp } from "utils/helpers";
import { getTimeFromSeconds } from "utils/dateConverter";
import FormGroup from "./FormGroup";
import { useTranslation } from "react-i18next";

function DurationPicker({ 
    min,
    max,
    value,
    onChange,
    ...delegated
}){
    const { t } = useTranslation();

    const duration = {
        current: getTimeFromSeconds(value),
        min: getTimeFromSeconds(min),
        max: getTimeFromSeconds(max)
    };

    const minMinutes = duration.min.hours === duration.current.hours ? duration.min.minutes : 0;
    const maxMinutes = duration.max.hours === duration.current.hours ? duration.max.minutes : 59;

    const handleHoursChange = e => {
        const seconds = Number(e.target.value) * 3600 + (duration.current.minutes * 60);
        onChange(clamp(min, seconds, max));
    }

    const handleMinutesChange = e => {
        const seconds = clamp(minMinutes, Number(e.target.value), maxMinutes) * 60 + (duration.current.hours * 3600);
        onChange(clamp(min, seconds, max));
    }

    return (
        <Wrapper {...delegated}>
            <StyledFormGroup
                label={t("hours")}
                name="hours"
                type="number"
                min={duration.min.hours}
                max={duration.max.hours}
                value={duration.current.hours}
                onChange={handleHoursChange}
                className="duration-picker"
            />

            <StyledFormGroup
                label={t("minutes")}
                name="minutes"
                type="number"
                min={minMinutes}
                max={maxMinutes}
                value={duration.current.minutes}
                onChange={handleMinutesChange}
                className="duration-picker"
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    ${props => props.theme.mixins.flexVertCenter};
`;

const StyledFormGroup = styled(FormGroup)`
    flex-direction: row;
    align-items: center;
    
    &.duration-picker label{
        font-size: var(--fz-sm) !important;
        margin: 0;
    }

    &.duration-picker input{
        order: -1;
        width: 100px !important;
        margin-inline-end: 10px;
    }
`;

export default DurationPicker;