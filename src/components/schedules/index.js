import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ScheduleForm from "./ScheduleForm";
import SchedulesTable from "./ScheduleTable";
import { useSchedules, useSchedule, useEditSchedule, useCreateSchedule } from "hooks/schedules";
import AdminHeader from "components/lib/AdminHeader";
import HeaderLink from "components/lib/HeaderLink";
import AsyncContainer from "components/lib/AsyncContainer";
import { getDateStringFromTime, getTimeFromDateString } from "utils/dateConverter";
import { useTranslation } from "react-i18next";

function Schedules(){
    const { data: schedules, ...state } = useSchedules();
    const { t } = useTranslation();

    return (
        <>
            <AdminHeader title={t("waterSchedule")} />
            <HeaderLink href="/admin/schedules/create" label={t("createWaterSchedule")} />
            <Wrapper {...state}>
                <SchedulesTable schedules={schedules} />
            </Wrapper>
        </>
    )
}

function Schedule(){
    const { id } = useParams();
    const { data: schedule, ...state } = useSchedule(id);
    const { mutate: edit, isLoading: isEditing } = useEditSchedule(id);
    const { t } = useTranslation();
    console.log(schedule);
    const getFormInitialState = () => {
        return {
            ...schedule,
            time_from: getTimeFromDateString(schedule.time_from),
            days: schedule.days || [],
            usage_type: schedule.usage_type || "generic"
        }
    }

    const processSchedule = React.useCallback(
        ({time_to, usage_type, id, ...schedule}) => ({
            ...schedule,
                time_from: getDateStringFromTime(schedule.time_from)
        }),
        []
    );

    const handleSubmit = React.useCallback(
        schedule => {
            const data = processSchedule(schedule);
            console.log(data);
            edit(data);
        },
        []
    );

    return (
        <>
            <AdminHeader title={t("waterSchedule")} />

            <Wrapper {...state}>
                {
                    schedule
                    &&
                    <ScheduleForm
                        initialScheduleData={getFormInitialState()}
                        isSubmitting={isEditing}
                        buttonLabel="Edit"
                        submit={handleSubmit}
                    />
                }
            </Wrapper>
        </>
    )
}

function CreateSchedule(){
    const { mutate: create, isLoading: isCreating } = useCreateSchedule();
    const { t } = useTranslation();

    const initialScheduleData = React.useMemo(
        () => ({
            time_from: "",
            duration: 60,
            name_en: "",
            name_ar: "",
            schedule_type: "daily",
            usage_type: "generic",
            days: [],
            device_id: 6,        
        }),
        []
    );

    const processSchedule = React.useCallback(
        schedule => ({
            ...schedule,
            time_from: getDateStringFromTime(schedule.time_from)
        }),
        []
    );

    const handleSubmit = React.useCallback(
        schedule => {
            const data = processSchedule(schedule);
            create(data);
        },
        []
    );

    return (
        <>
            <AdminHeader title={t("createWaterSchedule")} />

            <ScheduleForm
                initialScheduleData={initialScheduleData}
                isSubmitting={isCreating}
                submit={handleSubmit}
                buttonLabel="Submit"
            />
        </>
    )
}

const Wrapper = styled(AsyncContainer)`
    &.loading{
        height: 200px;
    }
`;

export {
    Schedules,
    Schedule,
    CreateSchedule
}
