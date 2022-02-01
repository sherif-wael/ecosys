import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Text from "./Text";

const errorIcons = {
    NOT_FOUND: "",
    NETWORK_ERROR: "",
    UNEXPECTED_ERROR: ""
};

function ErrorMessage({ error, ...delegated }){
    const icon = errorIcons[error.type] || errorIcons.UNEXPECTED_ERROR;
    const { t } = useTranslation();
    
    return (
        <Wrapper {...delegated}>
            <div className="icon">{icon}</div>
            <Text size="xl" className="msg">{t(error.message)}</Text>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    ${props => props.theme.mixins.flexColCenter};

    .icon{
        margin: 0 0 30px;
        max-width: 100px;
    }

    .msg{
        font-weight: 600;
        text-transform: capitalize;
    }
`;

export default ErrorMessage;