import { useMutation, useQuery, useQueryClient } from "react-query";
import useClient from "./useClient";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const defaultQueryConfig = {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
};

const defaultMutationConfig = {
    onError: err => toast.error(err.message)
};

function useRequests(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {404: t("noRequestsFound")}
    });

    return useQuery({
        queryKey: "requests",
        queryFn: () => client({ method: "GET", endpoint: "api/admin_tool/demands" }),
        ...defaultQueryConfig,
        ...options
    });
}

function useRequest(requestId){
    const client = useClient({
        errors: {404: "request not found! failed to fetch"}
    });

    return useQuery({
        queryKey: ["request", { requestId }],
        queryFn: () => client({endpoint: `api/admin_tool/demands/${requestId}`, method: "GET"}).then(({ demand }) => demand[0]),
        ...defaultQueryConfig,
        retry: false
    });
}

function useStories(){
    const client = useClient({
        errors: {422: "unprocessable entity"}
    });

    return useQuery({
        queryKey: "stoires",
        queryFn: () => client({method: "GET", endpoint: "api/admin_tool/demands/stories"}),
        ...defaultQueryConfig
    });
}

function useEditRequestStatus(request){
    const client = useClient();
    const queryClient = useQueryClient();

    const onSuccess = newStatus => {
        queryClient.setQueryData("requests", (requests = []) => {
            return requests.map(req => req.id === request.id ? {...request, status: newStatus} : req);
        });

        queryClient.invalidateQueries(["request", {requestId: String(request.id)}], {inactive: true});
    }

    return useMutation(
        status => client({method: "PUT", endpoint: `api/admin_tool/demands/${request.id}`, data: {status}}).then(() => status),
        {
            ...defaultMutationConfig,
            onSuccess
        }
    )
}

export {
    useRequests,
    useRequest,
    useStories,
    useEditRequestStatus
}