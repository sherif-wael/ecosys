import Table from "components/lib/Table";
import { DeleteGuidebook, ViewGuidebook } from "./GuidebookActions";
import { useTranslation } from "react-i18next";
import useTextMapper from "hooks/useTextMapper";

function GuidebooksTable({ guidebooks }){
    const { t } = useTranslation();
    const mapText = useTextMapper();
    const tableHead = [t("order"), t("name"), t("actions")];

    return (
        <Table list={guidebooks} tableHead={tableHead}>
            {
                slicedGuidebooks => slicedGuidebooks.map((guidebook, index) => (
                    <tr key={guidebook.id}>
                        <td>{index + 1}</td>
                        <td>{mapText(guidebook, "name")}</td>
                        <td className="actions">
                            <ViewGuidebook to={`/admin/guidebooks/${guidebook.id}`} />
                            <DeleteGuidebook guidebook={guidebook} />
                        </td>
                    </tr>
                ))
            }
        </Table>
    )
}

export default GuidebooksTable;