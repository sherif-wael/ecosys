import { Delete, View } from "components/lib/IconButton";
import { useRemoveSchedule } from "hooks/schedules";
import { useTranslation } from "react-i18next";

export function DeleteSchedule({ schedule }){
    const { mutate: remove, isLoading } = useRemoveSchedule();
    const { t } = useTranslation();

    return (
        <Delete
            onClick={() => remove(schedule)}
            question={t("deletingSchedule")}
            disabled={isLoading}
        />
    )
}

export function ViewSchedule({ to }){
    return (
        <View to={to} />
    )
}