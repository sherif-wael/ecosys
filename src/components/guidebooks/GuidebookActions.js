import { Delete, View } from "components/lib/IconButton";
import { useRemoveGuidebook } from "hooks/guidebooks";
import { useTranslation } from "react-i18next";

export function DeleteGuidebook({ guidebook }){
    const { mutate: remove, isLoading } = useRemoveGuidebook();
    const { t } = useTranslation();
    
    return (
        <Delete
            onClick={() => remove(guidebook)}
            question={t("deletingGuidebook")}
            disabled={isLoading}
        />
    )
}

export function ViewGuidebook({ to }){
    return (
        <View to={to} />
    )
}