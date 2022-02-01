import styled from "styled-components";
import Text from "./Text";
import { AiOutlineClose as CancelIcon } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function AttachmnetUploader({ className, attachment, onRemove, ...inputProps }){
    const { t } = useTranslation();

    if(attachment && typeof attachment === "string"){
        return (
            <LinkWrapper>
                <Text as="a" href={attachment}>{t("openAttachment")}</Text>

                <span className="icon">
                    <CancelIcon onClick={onRemove} />
                </span>
            </LinkWrapper>
        )
    }

    return (
        <input
            type="file"
            {...inputProps}
        />
    )
}

const LinkWrapper = styled.div`
    ${props => props.theme.mixins.flexVertCenter};
    flex-grow: 1;
    
    a{
        margin-inline-end: 10px;
    }

    .icon{
        padding: 6px;
        flex-shrink: 0;
        line-height: 0;

        &:hover{
            background-color: rgb(0, 0, 0, 0.1);
        }
    }
`;

export default AttachmnetUploader;