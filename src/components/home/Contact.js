import React from "react";
import styled from "styled-components";
import MaxWidthWrapper from "components/lib/MaxWidthWrapper";
import { SectionHeading } from "./SectionText";
import FormGroup from "components/lib/FormGroup";
import validateContactForm from "utils/validateContactForm";
import { useBoopWithClick } from "hooks/useBoop";
import { useTranslation } from "react-i18next";
import { useCreateMessage } from "hooks/messages";

const initialFormData = {
    email: "",
    full_name: "",
    subject: "",
    description: ""
};

function ContactForm(){
    const { t } = useTranslation();
    const [formData, setFormData] = React.useState(initialFormData);
    const [formError, setFormError] = React.useState({});
    
    const boopProps = useBoopWithClick();

    const { mutate: send, isLoading } = useCreateMessage({
        onSuccess: () => setFormData(initialFormData)
    });

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        setFormError({});
        const { isValid, error } = validateContactForm(formData);

        if(!isValid){
            setFormError(error)
        }else{
            send(formData);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <StyledFormGroup
                label={t("yourMessage")}
                name="description"
                forwardedAs="textarea"
                placeholder={t("yourMessagePlaceholder")}
                value={formData.description}
                onChange={handleChange}
                error={formError.description}
                className="full-width"
            />
            <StyledFormGroup
                label={t("fullName")}
                name="full_name"
                placeholder={t("fullNamePlaceholder")}
                value={formData.full_name}
                onChange={handleChange}
                error={formError.full_name}
                className="half-width"
            />
            <StyledFormGroup
                label={t("yourEmail")}
                name="email"
                placeholder={t("yourEmailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                error={formError.email}
                className="half-width"
            />
            <StyledFormGroup
                label={t("subject")}
                name="subject"
                placeholder={t("subjectPlaceholder")}
                value={formData.subject}
                onChange={handleChange}
                error={formError.subject}
                className="full-width"
            />

            <Submit disabled={isLoading} {...boopProps}> 
                {isLoading ? "Sending..." : t("send")}
            </Submit>
        </Form>
    )
}

function Contact(){
    const { t } = useTranslation();

    return (
        <Wrapper maxWidth={1300} as="section" id="contact">
            <SectionHeading as="h2"> 
                {t("getInTouch")}
            </SectionHeading>

            <ContactForm />
        </Wrapper>
    )
}

const Wrapper = styled(MaxWidthWrapper)`
    ${props => props.theme.mixins.flexColCenter};
    padding-bottom: 100px;

    ${SectionHeading}{
        max-width: none;
        margin: 0 0 60px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    max-width: 700px;
    width: calc(100% + 20px);
    margin: 0 -10px;
`;

const StyledFormGroup = styled(FormGroup)`
    padding: 10px;

    label{
        font-weight: 400;
        margin: 0 0 10px;
        font-size: 16px;
    }

    input, textarea{
        background-color: #fff;
        border-radius: 8px;
        border: 1px solid #E6E6E6;
        font-size: 16px;
        font-family: "Open Sans";
    }

    input{
        padding: 20px 16px;
    }

    textarea{
        padding: 20px 16px;
        resize: none;
        height: 240px;
    }

    &.full-width{
        width: 100%;
    }

    &.half-width{
        width: 100%;
    }

    .form-error{
    }

    @media (min-width: 768px){
        &.half-width{
            width: 50%;
        }
    }

    @media (min-width: 768px){
        font-size: 18px;
    }
`;

const Submit = styled.button`
    ${props => props.theme.mixins.defaultButtonStyles};
    margin: 20px auto 0;
    width: 160px;
    padding: 16px 0;
    font-size: 18px;
    color: #fff;
    border-radius: 30px;
    background-color: #258DC2;
    will-change: transform;
    transition: transform 200ms ease;
    backface-visibility: hidden;
`;

export default Contact;