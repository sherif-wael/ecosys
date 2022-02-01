import Table from "components/lib/Table";
import { View, Delete } from "components/lib/IconButton";
import { useTranslation } from "react-i18next";
import { trim } from "utils/helpers";
import { useRemoveMessage } from "hooks/messages";

function MessagesTable({ messages }){
    const { t } = useTranslation();
    const tableHead = [t("fullName"), t("messageSubject"), t("messageDescription"), t("actions")];
    const { mutate: remove, isLoading } = useRemoveMessage();

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

                            <Delete
                                onClick={() => remove(message.id)}
                                question={t("deletingMessage")}
                                disabled={isLoading}
                            />
                        </td>
                    </tr>
                ))
            }
        </Table>
    )
}

export default MessagesTable;