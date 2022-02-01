import styled from "styled-components";
import React from "react";
import FormGroup from "components/lib/FormGroup";
import validateTopicForm from "utils/validateTopicForm";
import Spinner from "components/lib/Spinner";
import { useTranslation } from "react-i18next";
import AttachmentUploader from "components/lib/AttachmentUploader";

function TopicForm({
    initialTopicData,
    buttonLabel,
    submit,
    isSubmitting = false,
    ...delegated
}){
    const [topicData, setTopicData] = React.useState(initialTopicData);
    const [formError, setFormError] = React.useState({});
    const { t } = useTranslation();

    const handleChange = e => {
        setTopicData({ ...topicData, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setFormError({});
        const { isError, error } = validateTopicForm(topicData);

        if(isError){
            setFormError(error);
        }else{
            submit(topicData);
        }
    }

    return (
        <Form onSubmit={handleSubmit} {...delegated}>
            <FormGroup
                className="form-group"
                label={t("arabicName")}
                name="name_ar"
                type="text"
                value={topicData.name_ar}
                onChange={handleChange}
                error={formError.name_ar}
            />

            <FormGroup
                className="form-group"
                label={t("englishName")}
                name="name_en"
                type="text"
                value={topicData.name_en}
                onChange={handleChange}
                error={formError.name_en}
            />

            <FormGroup
                className="form-group"
                label={t("arabicDescription")}
                name="description_ar"
                type="text"
                value={topicData.description_ar}
                onChange={handleChange}
                error={formError.description_ar}
                as="textarea"
            />

            <FormGroup
                label={t("englishDescription")}
                className="form-group"
                name="description_en"
                type="text"
                value={topicData.description_en}
                onChange={handleChange}
                error={formError.description_en}
                as="textarea"
            />

            <FormGroup
                className="form-group"
                label={t("order")}
                name="order"
                type="number"
                value={topicData.order}
                onChange={handleChange}
                error={formError.order}
            />

            <FormGroup
                label={t("attachment")}
                className="form-group"
                customInput={
                    <AttachmentUploader
                        attachment={topicData.attachment}
                        onChange={e => setTopicData({ ...topicData, attachment: e.target.files[0] })}
                        onRemove={() => setTopicData({ ...topicData, attachment: undefined })}
                    />
                }
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
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;

    .submit{
        ${props => props.theme.mixins.lgBtn}
        margin: 30px auto 0;
        color: #fff;
        background-color: var(--dark-green);    
    }

    .form-group{
        align-items: stretch;
        padding: 10px;
        flex-wrap: wrap;
        width: 50%;

        input:not(input[type=file]),
        textarea{
            ${props => props.theme.mixins.lightBorderInput};
            width: 100%;
        }
    
        .form-error{
            width: 100%;
        }
    
        textarea{
            resize: none;
            height: 130px;
        }    

        label{
            margin: 0 0 8px;
        }    
    }
`;

const FileInput = styled.input`
    margin: auto 0;
`;

export default TopicForm;