import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import MaxWidthWrapper from "./MaxWidthWrapper";

function PublicLayout({ children }){
    const { hash } = useLocation();

    React.useEffect(
        () => {
            if(!hash) return;
            const elem = document.querySelector(hash);
            elem.scrollIntoView({ behavior: "smooth" });
        },
        [hash]
    )

    return (
        <PublicLayoutWrapper>
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </PublicLayoutWrapper>
    )
}

function PrivateLayout({ children }){    
    return (
        <Wrapper>
            <Sidebar />

            <Main as="main" maxWidth={1300}>  
                <div>
                    {children}
                </div>
            </Main>
        </Wrapper>
    )
}

function Layout({ isPrivate, ...delegated }){
    return isPrivate ? <PrivateLayout {...delegated} /> : <PublicLayout {...delegated} />
}

const PublicLayoutWrapper = styled.div`
    background: var(--bg-gradient);
    min-height: 100vh;
    font-family: ${props => !props.theme.isArabic ? `'Open Sans', sans-serif` : "'Cairo', sans-serif"};
`;

const Wrapper = styled.div`
    display: flex;
    background-color: var(--gray-color);
    font-family: ${props => !props.theme.isArabic ? `Roboto, sans-serif` : "'Cairo', sans-serif"};
`;

const Main = styled(MaxWidthWrapper)`
    flex-grow: 1;
    padding-top: 32px;
`;

export default Layout;