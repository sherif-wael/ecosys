import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import useClient from "./useClient";
import { useTranslation } from "react-i18next";

const defaultQueryConfig = {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    retry: 1
};

const defaultMutationConfig = {
    onError: err => toast.error(err.message)
};

function useProducts(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {404: t("noProductsFound")}
    });
    
    return useQuery({
        queryKey: "products",
        queryFn: () => client({ method: "GET", endpoint: "api/admin_tool/products" }),
        ...defaultQueryConfig,
        ...options
    });
}

function useProduct(productId, options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: {404: t("invalidProductId")}
    });
    
    return useQuery({
        queryKey: ["product", { productId }],
        queryFn: () =>  client({ method: "GET", endpoint: `api/admin_tool/products/${productId}` }).then(data => data.product),
        ...defaultQueryConfig,
        ...options
    });
}

function useEditProduct(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToEdit") }
    });
    const queryClient = useQueryClient();

    const onSuccess = newProduct => {
        toast.success("product successfully editted!");
        queryClient.invalidateQueries("products", { refetchInactive: true });
        queryClient.invalidateQueries(["product", { productId: newProduct.id }])
    }

    // newProduct is a FormData
    return useMutation(
        newProduct => client({ method: "PUT", endpoint: `api/admin_tool/products/${newProduct.get("id")}`, data: newProduct }).then(data => data.data),
        {
            ...defaultMutationConfig,
            ...options,
            onSuccess
        }
    );
}

function useCreateProduct(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToCreate") }
    });
    const queryClient = useQueryClient();

    const onSuccess = newProduct => {
        toast.success("product successfully created!");
        queryClient.invalidateQueries("products", {refetchInactive: true});
    }

    return useMutation(
        newProduct => client({ method: "POST", endpoint: "api/admin_tool/products", data: newProduct }).then(data => data.data),
        {
            ...defaultMutationConfig,
            ...options,
            onSuccess
        }
    );
}

function useRemoveProduct(options = {}){
    const { t } = useTranslation();
    const client = useClient({
        errors: { 422: t("failedToRemove") }
    });
    const queryClient = useQueryClient();

    const onSuccess = removedProduct => {
        queryClient.setQueryData("products", products => {
            return products.filter(prod => prod.id !== removedProduct.id)
        });

        queryClient.removeQueries(["product", { productId: removedProduct.id }]);
    }

    return useMutation(
        product => client({ method: "DELETE", endpoint: `api/admin_tool/products/${product.id}`}).then(() => product),
        {
            ...defaultMutationConfig,
            ...options,
            onSuccess
        }
    );
}

export {
    useProducts,
    useProduct,
    useEditProduct,
    useCreateProduct,
    useRemoveProduct
}