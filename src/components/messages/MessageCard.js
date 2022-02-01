import styled from "styled-components";
import Text from "components/lib/Text";
import { useTranslation } from "react-i18next";

function MessageCard({ message }){
    console.log(message);
    const { t } = useTranslation();

    return (
        <Wrapper>
            <div className="info">
                <Text as="h4" size="lg">{t("fullName")}</Text>
                <Text size="md">{message.full_name}</Text>
            </div>

            <div className="info">
                <Text as="h4" size="lg">{t("messageEmail")}</Text>
                <Text size="md">{message.email}</Text>
            </div>

            <div className="info">
                <Text as="h4" size="lg">{t("messageSubject")}</Text>
                <Text size="md">{message.subject}</Text>
            </div>

            <div className="info">
                <Text as="h4" size="lg">{t("messageDescription")}</Text>
                <Text size="md">{message.description}</Text>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 32px;
    background-color: #fff;
    border-radius: 10px;
    max-width: 800px;
    
    .info{
        margin: 0 0 16px;
    }

    h4{
        margin: 0 0 5px;
    }
`;

export default MessageCard;