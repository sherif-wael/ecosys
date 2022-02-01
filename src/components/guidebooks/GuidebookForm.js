import React from "react";
import styled from "styled-components";
import FormGroup from "components/lib/FormGroup";
import validateGuidebookForm from "utils/validateGuidebookForm";
import { useTranslation } from "react-i18next";
import Spinner from "components/lib/Spinner";

function GuidebookForm({
  initialGuidebookData,
  submit,
  buttonLabel,
  isSubmitting = false,
  ...delegated  
}){
    const [guidebookData, setGuidebookData] = React.useState(initialGuidebookData);
    const [formError, setFormError] = React.useState({});
    const { t } = useTranslation();
    
    const handleChange = e => {
        setGuidebookData({ ...guidebookData, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setFormError({});

        const { isError, error } = validateGuidebookForm(guidebookData);

        if(isError){
            setFormError(error);
        }else{
            submit(guidebookData);
        }
    }

    return (
        <Form onSubmit={handleSubmit} {...delegated}>
            <StyledFormGroup
                label={t("arabicName")}
                name="name_ar"
                type="text"
                value={guidebookData.name_ar}
                onChange={handleChange}
                error={formError.name_ar}
            />
            <StyledFormGroup
                label={t("englishName")}
                name="name_en"
                type="text"
                value={guidebookData.name_en}
                onChange={handleChange}
                error={formError.name_en}
            />
            
            <button className="submit" disabled={isSubmitting}>
                {
                    isSubmitting ?
                        <Spinner borderWidth={3} size={20} />
                        :
                        buttonLabel
                }
            </button>
        </Form>
    )
}

const Form = styled.form`
    ${props => props.theme.mixins.formCard};

    .submit{
        ${props => props.theme.mixins.lgBtn}
        margin: 0 auto;
        color: #fff;
        background-color: var(--dark-green);    
    }
`;

const StyledFormGroup = styled(FormGroup)`
    ${props => props.theme.mixins.flexVertCenter};
    flex-direction: row;
    margin: 0 0 30px;

    label{
        margin-inline-end: 24px;
    }

    input{
        ${props => props.theme.mixins.lightBorderInput};
        flex-grow: 1;
    }
`;

export default GuidebookForm;