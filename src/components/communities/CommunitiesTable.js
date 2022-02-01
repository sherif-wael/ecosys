import Table from "components/lib/Table";
import { View } from "components/lib/IconButton";
import { useTranslation } from "react-i18next";

function CommunitiesTable({ communities }){
    const { t } = useTranslation();
    const tableHead = [t("title"), t("description"), t("actions")];

    return (
        <Table list={communities} tableHead={tableHead}>
            {
                slicedCommunities => slicedCommunities.map(community => (
                    <tr key={community.id}>
                        <td>{community.title}</td>
                        <td>{community.description}</td>
                        <td className="actions">
                            <View to={`/admin/communities/${community.id}`} />
                        </td>
                    </tr>
                ))
            }
        </Table>
    )
}

export default CommunitiesTable;