import React from "react";
import styled from "styled-components";
import FormGroup from "components/lib/FormGroup";
import Spinner from "components/lib/Spinner";
import Select from "react-select";
import DurationPicker from "components/lib/DurartionPicker";
import validateScheduleForm from "utils/validateScheduleForm";
import { useTranslation } from "react-i18next";

const scheduleTypeOptions = [
    {
        label: "daily",
        value: "daily"
    },
    {
        label: "bi_daily",
        value: "bi_daily"
    },
    {
        label: "specific_days",
        value: "specific_days"
    }
];

const scheduleUsageOptions = [
    {
        label: "generic",
        value: "generic"
    }
];

const scheduleDays = [
    {
        value: "monday",
        label: "monday"
    },
    {
        value: "tuesday",
        label: "tuesday"
    },
    {
        value: "wednesday",
        label: "wednesday"
    },
    {
        value: "thursday",
        label: "thursday"
    },
    {
        value: "friday",
        label: "friday"
    },
    {
        value: "saturday",
        label: "saturday"
    },
    {
        value: "sunday",
        label: "sunday"
    }
];

function ScheduleForm({
    initialScheduleData,
    submit,
    buttonLabel,
    isSubmitting = false,
    ...delegated
}){
    const [scheduleData, setScheduleData] = React.useState(initialScheduleData);

    const [formError, setFormError] = React.useState({});

    const handleChange = e => setScheduleData({...scheduleData, [e.target.name]: e.target.value});

    const handleDaysChange = options => setScheduleData({...scheduleData, days: options.map(opt => opt.value)});

    const { t } = useTranslation();

    const handleSubmit = e => {
        setFormError({});

        e.preventDefault();

        const { error, isError } = validateScheduleForm(scheduleData);

        if(isError){
            setFormError(error);
        }else{
            submit(scheduleData);
        }
    }

    return (
        <Form onSubmit={handleSubmit} {...delegated}>
            <FormGroup 
                label={t("englishName")}
                value={scheduleData.name_en}
                name="name_en"
                onChange={handleChange}
                type="text"
                className="form-group"
                error={formError.name_en}
            />
            <FormGroup 
                label={t("arabicName")}
                value={scheduleData.name_ar}
                name="name_ar"
                onChange={handleChange}
                type="text"
                className="form-group"
                error={formError.name_ar}
            />
            <FormGroup 
                label={t("timeFrom")}
                value={scheduleData.time_from}
                name="time_from"
                onChange={handleChange}
                type="time"
                className="form-group"
                error={formError.time_from}
            />
            <FormGroup
                label={t("duration")}
                name="duration"
                className="form-group"
                error={formError.duration}
                customInput={
                    <DurationPicker
                        min={60}
                        max={(23 * 60 * 60) + (59 * 60)}
                        value={scheduleData.duration}
                        onChange={duration => setScheduleData({...scheduleData, duration })}
                    />
                }
            />
            <FormGroup
                label={t("scheduleType")}
                name="schedule_type"
                className="form-group select"
                error={formError.schedule_type}
                customInput={
                    <Select 
                        value={scheduleTypeOptions.find(opt => opt.value === scheduleData.schedule_type)}
                        options={scheduleTypeOptions}
                        onChange={({value}) => setScheduleData({...scheduleData, schedule_type: value})}
                        className="custom-select"
                    />  
                }
            />

            <FormGroup
                label={t("days")}
                name="days"
                className="form-group"
                error={formError.days}
                customInput={
                    <Select
                        options={scheduleDays}
                        value={scheduleData.days.map(d => scheduleDays.find(({value}) => value === d))}
                        onChange={handleDaysChange}
                        isMulti={true}
                        className="custom-select"
                    />
                }
            />

            <FormGroup
                label={t("usageType")}
                name="usage_type"
                className="form-group select"
                error={formError.usage_type}
                customInput={
                    <Select
                        options={scheduleUsageOptions}
                        value={scheduleUsageOptions.find(opt => opt.value === scheduleData.usage_type)}
                        onChange={({value}) => setScheduleData({...scheduleData, usage_type: value})}
                        className="custom-select"
                    />    
                }
            />
            
            <div className="btn-wrapper">
                <Submit disabled={isSubmitting}>
                    {
                        isSubmitting ?
                            <Spinner borderWidth={3} size={20} />
                            :
                            buttonLabel
                    }
                </Submit>
            </div>
        </Form>
    )
}

const Form = styled.form`
    ${props => props.theme.mixins.formCard};
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;

    .form-group{
        width: 50%;
        padding: 10px;

        label{
            margin: 0 0 5px;
        }
    
        input,
        select{
            ${props => props.theme.mixins.lightBorderInput}
            width: 100%;
        }    

        .custom-select{
            width: 400px;
            max-width: 100%;
        }    

        .form-error{
            width: 100%;
        }
    }

    .btn-wrapper{
        width: 100%;
        margin: 16px 0 0;
    }
`;

const Submit = styled.button`
    ${props => props.theme.mixins.lgBtn};
    margin: 0 auto;
    color: #fff;
    background-color: var(--dark-green);
`;

export default ScheduleForm;