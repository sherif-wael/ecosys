import React from "react";
import styled from "styled-components"
import { useTranslation } from "react-i18next";
import { BsGlobe as Globe } from "react-icons/bs";
import Text from "./Text";
import useUpdateLanguage from "hooks/useUpdateLanguage";
import useAuth from "hooks/useAuth";

function LanguageToggler({ ...delegated }){
    const { i18n } = useTranslation();
    const { user, setUser } = useAuth();
    const { mutate: update, isLoading } = useUpdateLanguage({
        onSuccess: locale => {
            i18n.changeLanguage(locale);
            setUser({ locale })
        }
    });
    
    const newLang = i18n.language.startsWith("en") ? "ar" : "en";

    const toggle = () => {
        if(user){
            update(newLang);
        }else{
            i18n.changeLanguage(newLang);
        }
    }

    return (
        <Wrapper 
            onClick={toggle} 
            disabled={isLoading}
            {...delegated}
        >
            <Globe className="icon" />
            <Text size="xxs" className="lng">{newLang.toUpperCase()}</Text>
        </Wrapper>
    )
}

const Wrapper = styled.button`
    ${props => props.theme.mixins.buttonDefaultStyles};
    width: 40px;
    height: 40px;
    position: relative;
    color: #fff;

    .icon{
        font-size: 18px;
    }

    .lng{
        position: absolute;
        left: ${props => props.theme.isArabic ? "-5px" : "25px"};
        top: 25px;
        color: inherit;
        font-weight: 700;
    }
`;

export default LanguageToggler;