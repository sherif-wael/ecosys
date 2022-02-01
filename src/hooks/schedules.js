import { useQuery, useMutation, useQueryClient } from "react-query";
import useClient from "./useClient";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const defaultQueryConfig = {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    retry: 1
};

const defaultMutationConfig = {
    onError: err => toast.error(err.message)
};

function useSchedules(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {404: t("noSchedulesFound")}
    });

    return useQuery({
        queryKey: "schedules",
        queryFn: () => client({endpoint: "api/admin_tool/schedules/generic", method: "GET"}),
        ...defaultQueryConfig,
        ...options
    });
}

function useSchedule(scheduleId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {404: t("invalidScheduleId")}
    });

    return useQuery({
        queryKey: ["schedule", { scheduleId }],
        queryFn: () => client({endpoint: `api/admin_tool/schedules/${scheduleId}`}).then(data => data.schedule),
        ...defaultQueryConfig,
        ...options
    });
}

function useEditSchedule(scheduleId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {422: t("failedToEdit")}
    });
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries("schedules", {exact: true, refetchInactive: true});

        queryClient.invalidateQueries(["schedule", { scheduleId }]);

         toast.success("schedule successfully editted!");
    }


    return useMutation(
        schedule => client({endpoint: `api/admin_tool/schedules/${scheduleId}/update`, method: "POST", data: schedule}),
        { 
            ...defaultMutationConfig,
            ...options, 
            onSuccess 
        }
    );
}


function useCreateSchedule(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {422: t("failedToCreate")}
    });
    const queryClient = useQueryClient();

    const onSuccess =  newSchedule => {
        const schedules = queryClient.getQueryData("schedules");

        if(schedules){
            queryClient.setQueryData("schedules", [newSchedule, ...schedules]);
        }
        
        toast.success("schedule successfully created!")
    }

    return useMutation(
        schedule => client({endpoint: "api/admin_tool/schedules", method: "POST", data: schedule}).then(data => data.data),
        { 
            ...defaultMutationConfig,
            ...options, 
            onSuccess 
        }
    );
}

function useRemoveSchedule(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToRemove") }
    });
    const queryClient = useQueryClient();

    const onSuccess = removedSchedule => {
        queryClient.setQueryData("schedules", schedules => {
            return schedules?.filter(schedule => schedule.id !== removedSchedule.id)
        });

        queryClient.removeQueries(["schedule", { scheduleId: removedSchedule.id }], { exact: true });        
    }

    // TODO: perform an api call to remove schedule 
    return useMutation(
        schedule => client({ method: "DELETE", endpoint: `api/admin_tool/schedules/${schedule.id}`}).then(() => schedule),
        { 
            ...defaultMutationConfig,
            ...options, 
            onSuccess 
        }
    )
}

export {
    useSchedules,
    useSchedule,
    useEditSchedule,
    useCreateSchedule,
    useRemoveSchedule
}