import Table from "components/lib/Table";
import { View } from "components/lib/IconButton";
import { useTranslation } from "react-i18next";
import { trim } from "utils/helpers";

function MessagesTable({ messages }){
    const { t } = useTranslation();
    const tableHead = [t("fullName"), t("messageSubject"), t("messageDescription"), t("actions")];

    return (
        <Table list={messages} tableHead={tableHead}>
            {
                slicedMessages => slicedMessages.map(message => (
                    <tr key={message.id}>
                        <td>{message.full_name}</td>
                        <td>{message.subject}</td>
                        <td>{trim(message.description, 50)}</td>
                        <td className="actions">
                            <View to={`/admin/messages/${message.id}`} />
                        </td>
                    </tr>
                ))
            }
        </Table>
    )
}

export default MessagesTable;