import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import useClient from "./useClient";
import { useTranslation } from "react-i18next";

const defaultQueryConfig = {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    retry: false
};

function useMessages(){
    const { t } = useTranslation();

    const client = useClient({
        errors: {404: t("noMessagesFound")}
    });

    return useQuery({
        queryKey: "messages",
        queryFn: () => client({method: "GET", endpoint: "api/admin_tool/contact_us"}),
        ...defaultQueryConfig
    })
}

function useMessage(messageId){
    const { t } = useTranslation();
    const client = useClient({
        errors: {404: t("messageNotFound")}
    });

    return useQuery({
        queryKey: ["message", {messageId}],
        queryFn: () => client({method: "GET", endpoint: `api/admin_tool/contact_us/${messageId}`}).then(m => m.contact),
        ...defaultQueryConfig
    });
}

function useCreateMessage(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {422: "failedToCreate"}
    });
    const queryClient = useQueryClient();

    const onSuccess = () => {
        options.onSuccess();
        toast.success(t("messageCreated"));
        
        queryClient.invalidateQueries("messages");
    }

    return useMutation(
        data => client({method: "POST", endpoint: "api/admin_tool/contact_us", data}),
        {
            onSuccess
        }
    );
}

function useRemoveMessage(){
    const { t } = useTranslation();
    const client = useClient({
        errors: {422: t("failedToRemove"), 404: t("failedToRemove")}
    });
    const queryClient = useQueryClient();

    const onSuccess = messageId => {
        queryClient.setQueryData("messages", (messages = []) => {
            return messages.filter(m => m.id !== messageId)
        });

        queryClient.removeQueries(["message", {messageId}]);
    }

    return useMutation(
        messageId => client({method: "DELETE", endpoint: `api/admin_tool/contact_us/${messageId}`}).then(() => messageId),
        {
            onSuccess,
            onError: err => toast.error(err.message)
        }
    );
}

export {
    useMessages,
    useMessage,
    useCreateMessage,
    useRemoveMessage
}