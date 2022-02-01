import React from "react";
import styled from "styled-components";
import logo from "static/logo.png";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_LINKS } from "constants/navigation";
import Text from "./Text";
import useAuth from "hooks/useAuth";
import logoutIcon from "static/logout.png";
import { useTranslation } from "react-i18next";

function Sidebar(){
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Logo src={logo} alt="logo" />

            <Nav>
                <ul>
                    {
                        SIDEBAR_LINKS.map((navLink, index) => (
                          <li key={index}>
                              <NavLink to={navLink.href} className={pathname === navLink.href ? "active" : ""}>
                                  <span className="icon">{navLink.icon}</span>
                                  <Text size="lg" as="span" className="txt">{t(navLink.label)}</Text>
                              </NavLink>
                          </li>
                        ))
                    }
                    <li>
                        <NavAction as="button" onClick={logout}>
                            <span className="icon"><img src={logoutIcon} alt="logout" /></span>
                            <Text size="lg" as="span" className="txt">{t("logout")}</Text>
                        </NavAction>
                    </li>
                </ul>
            </Nav>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    ${props => props.theme.mixins.flexCol};
    background-color: var(--white-color);
    height: 100vh;
    overflow-y: auto;
    width: var(--sidebar-width);
    max-width: 100%; 
    position: sticky;
    top: 0;
    padding: 28px 0;
`;

const Logo = styled.img`
    max-width: 180px;
    align-self: center;
    margin: 0 0 16px;
`;

const Nav = styled.nav``;

const NavLink = styled(Link)`
    display: block;
    padding: ${props => props.theme.isArabic ? "14px 24px" : "18px 24px"};
    ${props => props.theme.mixins.flexCenter};
    text-decoration: none;
    color: var(--primary-color);
    text-transform: capitalize;

    .txt{
        line-height: 0;
    }

    .icon{
        margin-inline-end: 15px;
        line-height: 0;
    }

    &.active,
    &:hover{
        background-color: hsl(0deg, 0%, 97%);
    }
`;

const NavAction = styled(NavLink)`
    background-color: transparent;
    width: 100%;
`;

export default Sidebar;