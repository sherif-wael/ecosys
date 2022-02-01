import React from "react";
import styled from "styled-components";
import FormGroup from "components/lib/FormGroup";
import validateProductForm from "utils/validateProductForm";
import Spinner from "components/lib/Spinner";
import PhotoUploader from "components/lib/PhotoUploader";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const statusOptions = t => [
    {
        value: "unavailable",
        label: t("unavailable")
    },
    {
        value: "available",
        label: t("available")
    }
];

function ProductForm({
    initialProductData,
    isSubmitting,
    submit,
    buttonLabel
}){
    const [productData, setProductData] = React.useState(initialProductData);
    const [formError, setFormError] = React.useState({});
    const { t } = useTranslation();

    const handleChange = e => setProductData({...productData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        setFormError({});
        const {isError, error} = validateProductForm(productData);
        if(isError){
            setFormError(error);
        }else{
            submit(productData);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup
                label={t("englishName")}
                name="name_en"
                type="text"
                onChange={handleChange}
                value={productData.name_en}
                error={formError.name_en}
                className="form-group"
            />

            <FormGroup
                label={t("arabicName")}
                name="name_ar"
                type="text"
                onChange={handleChange}
                value={productData.name_ar}
                error={formError.name_ar}
                className="form-group"
            />
            <FormGroup
                label={t("englishDescription")}
                name="description_en"
                as="textarea"
                onChange={handleChange}
                value={productData.description_en}
                error={formError.description_en}
                className="form-group"
            />
            <FormGroup
                label={t("arabicDescription")}
                name="description_ar"
                as="textarea"
                onChange={handleChange}
                value={productData.description_ar}
                error={formError.description_ar}
                className="form-group"
            />

            <FormGroup
                label={t("price")}
                name="price"
                type="number"
                onChange={handleChange}
                value={productData.price}
                error={formError.price}
                className="form-group"
            />

            <FormGroup 
                label={t("status")}
                className="form-group"
                customInput={
                    <Select 
                        options={statusOptions(t)}
                        value={statusOptions(t).find(({ value }) => value === productData.status)}
                        onChange={option => setProductData({ ...productData, status: option.value})}
                        className="select-status"
                    />
                }
            />

            <FormGroup 
                label={t("image")}
                className="form-group photo-uploader-wrapper"
                error={formError.image}
                customInput={
                    <PhotoUploader
                        className="photo-input"
                        photo={productData.image}
                        onChange={photoUrl => setProductData({...productData, image: photoUrl})}
                        aspectRatio={2 / 1}
                    />
                }
            />

            <div className="btn-wrapper">
                <Submit disabled={isSubmitting}>
                    {
                        isSubmitting ?
                            <Spinner borderWidth={3} size={20} />
                            :
                            buttonLabel
                    }
                </Submit>           
            </div>
        </Form>
    )
}

const Form = styled.form`
    ${props => props.theme.mixins.formCard};
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;

    .form-group.photo-uploader-wrapper{
        width: 50%;
    }

    .photo-input{
        width: 100%;
    }

    .form-group{
        padding: 10px;
        width: 50%;

        label{
            margin: 0 0 7px;
        }    

        input,
        textarea{
            ${props => props.theme.mixins.lightBorderInput};
            width: 100%;
        }
        
        textarea{
            min-height: 120px;
            resize: none;
        }
    }

    .btn-wrapper{
        width: 100%;
    }
`;

const Submit = styled.button`
    ${props => props.theme.mixins.lgBtn};
    margin: 20px auto 0;
    color: #fff;
    background-color: var(--dark-green);
`;

export default ProductForm;