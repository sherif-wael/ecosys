import styled from "styled-components";
import Text from "components/lib/Text";
import { useTranslation } from "react-i18next";

function RequestCard({ request }){
    const { t } = useTranslation();

    return (
        <Wrapper>
            <div className="info">
                <Text as="h3" size="xl" className="info-type">{t("title")}</Text>
                <Text as="p" size="md" className="info-txt">{request.title}</Text>
            </div>

            <div className="info">
                <Text as="h3" size="xl" className="info-type">{t("description")}</Text>
                <Text as="p" size="md" className="info-txt">{request.description}</Text>
            </div>

            <div className="info">
                <Text as="h3" size="xl" className="info-type">{t("status")}</Text>
                <Text as="p" size="md" className="info-txt">{request.status}</Text>
            </div>

            <div className="info">
                <Text as="h3" size="xl" className="info-type">{t("requestType")}</Text>
                <Text as="p" size="md" className="info-txt">{request.demand_type}</Text>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 32px;
    background-color: #fff;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;    

    .info{
        margin: 0 0 24px;
    }

    .info-type{
        margin: 0 0 12px;
    }
`;

export default RequestCard;