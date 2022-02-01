import useClient from "./useClient";
import { useQuery, useMutation, useQueryClient } from "react-query";
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

function useGuidebooks(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 404: t("noGuidebooksFound")}
    });
    
    return useQuery({
        queryKey: "guidebooks",
        queryFn: () => client({ endpoint: "api/admin_tool/guidebooks", method: "GET" }),
        ...defaultQueryConfig,
        ...options
    });
}

function useGuidebook(guidebookId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {404: t("invalidGuidebookId")}
    });

    return useQuery({
        queryKey: ["guidebook", { guidebookId }],
        queryFn: () => client({ endpoint: `api/admin_tool/guidebooks/${guidebookId}`, method: "GET" }),
        ...defaultQueryConfig,
        ...options
    });
}

function useCreateGuidebook(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToCreate") }
    });
    const queryClient = useQueryClient();

    const onSuccess = newGuidebook => {
        options.onSuccess?.(newGuidebook);

        toast.success("guidebook created successfully");
        
        queryClient.setQueryData("guidebooks", (guidebooks = []) => [...guidebooks, newGuidebook]);
    }

    return useMutation(
        newGuidebook => client({ endpoint: "api/admin_tool/guidebooks", method: "POST", data: newGuidebook }).then(data => data.data),
        {
            ...defaultMutationConfig,
            ...options,
            onSuccess,
        }
    )
}

function useEditGuidebook(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToEdit") }
    });
    const queryClient = useQueryClient();

    const onSuccess = newGuidebook => {
        options.onSuccess?.(newGuidebook);

        queryClient.setQueryData("guidebooks", guidebooks => {
            return guidebooks.map(g => g.id === newGuidebook.id ? newGuidebook : g);
        });

        queryClient.setQueryData(["guidebook", { guidebookId: newGuidebook.id }], newGuidebook);
    }

    return useMutation(
        newGuidebook => client({ endpoint: `api/admin_tool/guidebooks/${newGuidebook.id}/update`, method: "POST", data: newGuidebook }),
        {
            ...defaultMutationConfig,
            ...options,
            onSuccess
        }
    )
}

function useRemoveGuidebook(options = {}){
    const { t } = useTranslation();
    const client = useClient({
       errors: {  422: t("failedToDelete") }
    });
    const queryClient = useQueryClient();

    const onSuccess = removedGuidebook => {
        options.onSuccess?.(removedGuidebook);

        toast.success("guidebook successfully deleted");

        queryClient.setQueryData("guidebooks", guidebooks => {
            return guidebooks.filter(guidebook => guidebook.id !== removedGuidebook.id);
        })

        queryClient.removeQueries(["guidebook", { guidebookId: removedGuidebook.id }]);
        queryClient.removeQueries(["topics", { guidebookId: removedGuidebook.id }]);
    }

    return useMutation(
        removedGuidebook => client({ endpoint: `api/admin_tool/guidebooks/${removedGuidebook.id}`, method: "DELETE" }).then(() => removedGuidebook),
        {
            ...defaultMutationConfig,   
            ...options,
            onSuccess
        }
    )
}

export {
    useGuidebook,
    useGuidebooks,
    useCreateGuidebook,
    useEditGuidebook,
    useRemoveGuidebook
}