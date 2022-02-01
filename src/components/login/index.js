import styled from "styled-components";
import LoginForm from "./LoginForm";
import logo from "static/logo.png";
import MaxWidthWrapper from "components/lib/MaxWidthWrapper";
import useAuth from "hooks/useAuth";
import { Navigate } from "react-router-dom";

function Login(){
    const { user } = useAuth();

    return (
        <>
            {
                user ? 
                    <Navigate to="/admin" />
                    :
                    <div style={{backgroundColor: "var(--light-gray)"}}>
                        <Wrapper maxWidth={1300}>
                            <Card>
                                <Logo src={logo} alt="logo" />
                                <LoginForm />
                            </Card>
                        </Wrapper>    
                    </div>
            }
        </>
    )
}

const Wrapper = styled(MaxWidthWrapper)`
    min-height: 100vh;
    ${props => props.theme.mixins.flexCenter};
    padding-top: 50px;
    padding-bottom: 50px;
`;

const Card = styled.div`
    ${props => props.theme.mixins.flexColCenter};
    padding: 24px 16px;
    border-radius: 10px;
    background-color: var(--white-color);
    width: 100%;
    max-width: 500px;

    @media (min-width: 480px){
        padding: 48px;
    }
`;

const Logo = styled.img`
    margin: 0 0 32px;
`;

export {
    Login
};