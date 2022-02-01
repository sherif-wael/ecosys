import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormGroup from "components/lib/FormGroup";
import Spacer from "components/lib/Spacer";
import Text from "components/lib/Text";
import useAsync from "hooks/useAsync";
import useAuth from "hooks/useAuth";
import Spinner from "components/lib/Spinner";
import { useTranslation } from "react-i18next";

function LoginForm(){
    const { login } = useAuth();
    const [formData, setFormData] = React.useState({email: "", password: ""});
    const { isLoading, isError, error, run, reset } = useAsync();
    const { t } = useTranslation();

    const handleInputChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        reset();
        run(login(formData));
    }

    return (
        <Form>
            {isError && error.type === "INVALID_INPUT" && <FormError size="sm">{error.message}</FormError>}
            <FormGroup
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                label={t("email")}
                type="text"
            />
            <Spacer size={20} />
            <FormGroup
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                label={t("password")}
                type="password"
            />
            <Spacer size={20} />
            <ForgotPassword to="/forgot-password">
                <Text as="span" size="lg">{t("forgotPassword")}</Text>
            </ForgotPassword>
            <Spacer size={20} />
            <Submit
                disabled={isLoading}
                onClick={handleSubmit}
            >
                {
                    isLoading ?
                        <Spinner borderWidth={3} size={20} />
                        :
                        <Text as="span" size="lg" color="white">Login</Text>
                }
            </Submit>
        </Form>
    )
}

const Form = styled.div`
    ${props => props.theme.mixins.flexCol};
    width: 100%;
`;

const FormError = styled(Text)`
    margin: 0 0 20px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    padding: 10px;
    background-color: hsl(87, 63%, 80%);
`;

const ForgotPassword = styled(Link)`
    font-weight: 700;
    text-decoration: none; 
    letter-spacing: 0.4px;
    color: var(--primary-color);
    display: block;

    &:hover{
        text-decoration: underline;
    }
`;

const Submit = styled.button`
    ${props => props.theme.mixins.lgBtn};
    align-self: center;
    background-color: var(--dark-green);
`;

export default LoginForm;


