import styled from "styled-components";
import Text from "components/lib/Text";
import { useTranslation } from "react-i18next";

function CommunityCard({ community }){
    const { t } = useTranslation();
    
    return (
        <Wrapper>
            <div className="info">
                <Text as="h3" size="xl" className="info-type">{t("title")}</Text>
                <Text as="p" size="md" className="info-txt">{community.title}</Text>
            </div>

            <div className="info">
                <Text as="h3" size="xl" className="info-type">{t("description")}</Text>
                <Text as="p" size="md" className="info-txt">{community.description}</Text>
            </div>

            {
                community.attachment
                &&
                <div className="info">
                    <Text as="h3" size="xl" className="info-type">{t("attachment")}</Text>
                    <a href={community.attachment}>Attachment</a>
                </div>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 32px;
    background-color: #fff;
    border-radius: 10px;

    .info{
        margin: 0 0 24px;
    }

    .info-type{
        margin: 0 0 12px;
    }
`;

export default CommunityCard;