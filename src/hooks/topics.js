import useClient from "./useClient";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const defaultQueryConfig = {
    retry: false
};

const defaultMutationConfig = {
    onError: err => toast.error(err.message)
};

function useTopics(guidebookId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 404: t("noTopicsFound") }
    });
    const queryClient = useQueryClient();
    
    const onSuccess = topics => {
        for(let topic of topics){
            queryClient.setQueryData(["topic", { topicId: topic.id }]);
        }
    }

    return useQuery({
        queryKey: ["topics", { guidebookId }],
        queryFn: () => client({ endpoint: `api/admin_tool/topics/by_guidebook?guidebook_id=${guidebookId}`, method: "GET" }),
        ...defaultQueryConfig,
        ...options,
        onSuccess
    });
}

function useTopic(topicId, guidebookId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 404: t("invalidTopicId")}
    });

    return useQuery({
        queryKey: ["topic", { topicId }],
        queryFn: () => client({
            endpoint: `api/admin_tool/topics/${topicId}?guidebook_id=${guidebookId}`, 
            method: "GET"
        }).then(data => data.topic),
        ...defaultQueryConfig,
        ...options
    });
}

function useCreateTopic(guidebookId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToCreate")}
    });
    const queryClient = useQueryClient();

    const onSuccess = () => {
        toast.success("new topic successfully created");
        queryClient.invalidateQueries(["topics", { guidebookId }], { refetchInactive: true })
    }

    return useMutation(
        newTopic => client({ endpoint: "api/admin_tool/topics", method: "POST", data: newTopic }).then(data => data.data),
        {
            ...defaultMutationConfig,
            ...options,
            onSuccess
        }
    )
}

function useEditTopic(topicId, guidebookId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToEdit") }
    });
    const queryClient = useQueryClient();

    const onSuccess = () => {
        toast.success("topic successfully editted");
        queryClient.invalidateQueries(["topics", { guidebookId }], { refetchInactive: true })
        queryClient.invalidateQueries(["topic", { topicId }])
    }

    return useMutation(
        topic => client({ endpoint: `api/admin_tool/topics/${topicId}`, method: "PUT", data: topic }),
        {
            ...defaultMutationConfig,
            ...options,
            onSuccess
        }
    )
}

function useRemoveTopic(guidebookId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToRemove") }
    });
    const queryClient = useQueryClient();

    const onSuccess = removedTopic => {
        const queryKey = ["topics", { guidebookId }];
        const topics = queryClient.getQueryData(queryKey);

        if(topics){
            queryClient.setQueryData(queryKey, topics.filter(topic => topic.id !== removedTopic.id))
        }
    }

    return useMutation(
        removedTopic => client({ 
            endpoint: `api/admin_tool/topics/${removedTopic.id}?guidebook_id=${guidebookId}`, 
            method: "DELETE" 
        })
        .then(() => removedTopic),
        {
            ...defaultMutationConfig,
            ...options,
            onSuccess
        }
    )
}


export {
    useTopic,
    useTopics,
    useCreateTopic,
    useEditTopic,
    useRemoveTopic
}