import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import logo from "static/logo.png";
import { HEADER_LINKS } from "constants/navigation";
import MaxWidthWrapper from "./MaxWidthWrapper";
import LanguageToggler from "./LanguageToggler";
import { useTranslation } from "react-i18next";

function Header(){
    const { t } = useTranslation();
    const [isOpened, setIsOpened] = React.useState(false);

    const closeNav = React.useCallback(() => setIsOpened(false), []);

    React.useEffect(
        () => {
            const handler = () => setIsOpened(false);
            window.addEventListener("resize", handler);

            return () => window.removeEventListener("resize", handler);
        },
        []
    );

    React.useLayoutEffect(
        () => {
            if(isOpened){
                document.body.style.overflow = "hidden";
                document.documentElement.scrollTop = 0;
            }else{
                document.body.style.overflow = "auto";
            }

            return () => document.body.style.overflow = "auto";
        },
        [isOpened]
    );

    return (
        <StyledHeader>
            <Wrapper maxWidth={1300}>
                <Logo href="/">
                    <img src={logo} alt="Smarts Plants Logo" />
                </Logo>

                <Nav isOpened={isOpened}>
                    <ul>
                        {
                            HEADER_LINKS.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.href} className="nav-link" onClick={closeNav}>{t(link.label)}</Link>
                                </li>
                            ))
                        }
                        <li><LanguageToggler className="lng-toggler" /></li>
                    </ul>
                </Nav>

                <Toggler isOpened={isOpened} onClick={() => setIsOpened(!isOpened)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </Toggler>
            </Wrapper>
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    background-color: #e8f5e4;
`;

const Wrapper = styled(MaxWidthWrapper)`
    ${props => props.theme.mixins.flexSpaceBetween};
`;

const Logo = styled.a`
    img{
        max-width: 75px;
    }
`;

const Nav = styled.nav`
    ul{
        ${props => props.theme.mixins.flexVertCenter}
    }

    ul .nav-link{
        color: #111;
        padding: 16px;
        text-decoration: none;
        text-transform: capitalize;
    }

    @media (max-width: 768px){
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: #9fcc9b;
        transition: transform 500ms ease;
        transform: ${props => props.isOpened ? "translateX(0px)" : "translateX(-100%)"};
        ${props => props.theme.mixins.flexCenter};

        ul{
            ${props => props.theme.mixins.flexColCenter};
        }

        ul li{
           margin: 0 0 20px;

            &:last-child{
                margin: 0;
            }
        }

        ul .nav-link{
            font-size: 20px;
            padding: 10px;
        }
    }

    .lng-toggler{
        color: #111;
    }
`;

const Toggler = styled.button`
    position: relative;
    z-index: 101;
    display: block;
    border: none;
    background-color: transparent;
    padding: 10px;
    display: none;

    .bar{
        display: block;
        width: 25px;
        height: 2px;
        background-color: #111;
        margin: 0 0 5px;
        transition: transform 500ms ease,
                    opacity 500ms ease;
        &:last-child{
            margin: 0;
        }
    }

    ${props => (
        props.isOpened
        &&
        css`
            .bar:nth-child(1){
                transform: translateY(7px) rotate(45deg);
            }

            .bar:nth-child(2){
                opacity: 0
            }

            .bar:nth-child(3){
                transform: translateY(-7px) rotate(-45deg);
            }
        `
    )}

    @media (max-width: 768px){
        display: block;
    }
`;

export default Header;