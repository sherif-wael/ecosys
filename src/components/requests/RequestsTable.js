import RequestStatus from "./RequestStatus";
import Table from "components/lib/Table";
import { View } from "components/lib/IconButton";
import { useTranslation } from "react-i18next";
import useTextMapper from "hooks/useTextMapper";

function RequestsTable({ requests }){
    console.log(requests);
    const { t } = useTranslation();
    const mapTex = useTextMapper();
    const tableHead = [t("requests"), t("description"), t("status"), t("actions")];

    return (
        <Table list={requests} tableHead={tableHead}>
            {
                slicedRequests => slicedRequests.map(request => (
                    <tr key={request.id}>
                        <td>{request.title}</td>
                        <td>{request.description}</td>
                        <td><RequestStatus status={request.status} request={request} /></td>
                        <td className="actions">
                            <View to={`/requests/${request.id}`} />
                        </td>
                    </tr>
                ))
            }
        </Table>
    )
}

export default RequestsTable;