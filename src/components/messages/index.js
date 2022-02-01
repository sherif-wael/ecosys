import styled from "styled-components";
import AsyncContainer from "components/lib/AsyncContainer";
import MessagesTable from "./MessagesTable";
import MessageCard from "./MessageCard"
import { useParams } from "react-router-dom";
import { useMessage, useMessages } from "hooks/messages";
import AdminHeader from "components/lib/AdminHeader";
import { useTranslation } from "react-i18next";


function Messages(){
    const { t } = useTranslation();
    const { data: messages, ...state } = useMessages();

    return (
        <>
            <AdminHeader title={t("messages")} />

            <Wrapper {...state}> 
                {
                    messages
                    &&
                    <MessagesTable messages={messages} />
                }
            </Wrapper>
        </>
    )
}

function Message(){
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: message, ...state } = useMessage(Number(id));

    return (
        <>
            <AdminHeader title={t("message")} />

            <Wrapper {...state}>
                {
                    message
                    &&
                    <MessageCard message={message} />
                }
            </Wrapper>
        </>
    )
}

const Wrapper = styled(AsyncContainer)`
    &.loading{
        height: 200px;
    }
`;

export {
    Messages,
    Message
}