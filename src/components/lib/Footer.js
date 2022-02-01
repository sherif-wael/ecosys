import styled from "styled-components";
import SBSLogo from "static/sbs-logo.png";
import { useTranslation } from "react-i18next";

function Footer(){
    const { t } = useTranslation();

    return (
        <Wrapper>
            <span className="powered-by">
                {t("poweredBy")} 
            </span>
            <a href="https://shoplessbiz.com/">
                <img src={SBSLogo} alt="shopless business solutions logo" className="sbs-logo" />
            </a>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    ${props => props.theme.mixins.flexCenter}
    padding: 8px;
    background-color: #e8f5e4;
    color: #111;
    font-size: 14px;
    text-transform: capitalize;

    .powered-by{
        margin-inline-end: 8px;
    }

    .sbs-logo{
        max-width: 150px;
    }
`;

export default Footer;