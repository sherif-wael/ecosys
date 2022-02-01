import { Delete, View } from "components/lib/IconButton";
import { useRemoveProduct } from "hooks/products";
import { useTranslation } from "react-i18next";

export function ViewProduct({ to }){
    return (
        <View to={to} />
    )
}

export function DeleteProduct({ product }){
    const { mutate: remove, isLoading } = useRemoveProduct();
    const { t } = useTranslation();
    
    return (
        <Delete
            onClick={() => remove(product)}
            question={t("deletingProduct")}
            disabled={isLoading}
        />
    )
}
 