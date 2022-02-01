import { isEmpty } from "./helpers";

function validateScheduleForm({
    name_en,
    name_ar,
    schedule_type,
    usage_type,
    time_from,
    time_to,
    days
}){
    const error = {};

    const validateEnglishName = () => {
        if(!name_en) error.name_en = "please enter a valid english schedule name";
    }

    const validateArabicName = () => {
        if(!name_ar) error.name_ar = "please enter a valid arabic schedule name";
    }

    const validateScheduleType = () => {
        if(!schedule_type) error.schedule_type = "please select a schedule type";
    }

    const validateUsageType = () => {
        if(!usage_type) error.usage_type = "please select a valid usage type";
    }

    const validateScheduleDays = () => {
        if(!days) return;
        const hasSpecificDays = days.length > 0;

        if(schedule_type === "specific_days" && !hasSpecificDays){
            error.days = "please select your schedule specific days";
        }

        if(schedule_type !== "specific_days" && hasSpecificDays){
            error.schedule_type = `${schedule_type} doesn't support days. please remove the selected days`;
        }
    }

    const validateTimeFrom = () => {
        if(!time_from) error.time_from = "please enter a valid time from";
    }


    const exec = () => {
        validateEnglishName();
        validateArabicName();
        validateScheduleType();
        validateScheduleDays();
        validateUsageType();
        validateTimeFrom();
    }

    exec();

    return {
        isError: !isEmpty(error),
        error
    }
}

export default validateScheduleForm;