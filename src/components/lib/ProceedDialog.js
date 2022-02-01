import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Text from "./Text";

function DialogBox({ question, accept, close }){
    const { t } = useTranslation();

    return (
        <Wrapper>
            <div className="dialog">
                <Text size="xxl">{question}</Text>
                <div className="actions">
                    <button className="no" onClick={close}>{t("cancel")}</button>
                    <button className="yes" onClick={accept}>{t("yes")}</button>
                </div>
            </div>
        </Wrapper>
    )
}

function ProceedDialog({ question, onClick, children, ...delegated }){
    const [isOpened, setIsOpened] = React.useState(false);

    const close = React.useCallback(() => setIsOpened(false), []);
    const open = React.useCallback(() => setIsOpened(true), []);
    const accept = React.useCallback(() => {
        close();
        onClick();
    }, []);

    const btn = React.useMemo(() => React.cloneElement(children, {onClick: open, ...delegated}), []);

    return (
        <>
            {btn}
            {
                isOpened 
                &&
                <DialogBox 
                    close={close}
                    accept={accept}
                    question={question}
                />
            }
        </>
    )
}

const Wrapper = styled.div`
    ${props => props.theme.mixins.background};
    ${props => props.theme.mixins.flexCenter};
    position: fixed;
    background-color: rgb(0, 0, 0, 0.4);

    .dialog{
        ${props => props.theme.mixins.flexColCenter};
        width: 90%;
        max-width: 500px;
        padding: 24px;
        background-color: #fff;
        border-radius:  10px;

        p{
            font-weight: 700;
            margin: 0 0 20px;
            text-align: center;
        }

        .actions{
            display: flex;
        }

        button{
            ${props => props.theme.mixins.lgBtn};
            width: 100px;
            text-transform: capitalize;
            color: #fff;
        }

        .yes{
            background-color: #FF0909;
        }

        .no{
            margin-inline-end: 40px;
            background-color: #258DC2;
        }
    }
`;

export default ProceedDialog;