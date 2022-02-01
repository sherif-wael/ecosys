import { Link } from "react-router-dom";
import styled from "styled-components";

function HeaderLink({ href, label, ...delegated }){
    return (
        <Wrapper {...delegated}>
            <Link to={href} className="link">{label}</Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    margin: 0 0 24px;

    .link{
        ${props => props.theme.mixins.lgBtn};
        text-decoration: none;
        margin: 0 0 0 auto;
        background-color: var(--dark-green);
        color: #fff;
        font-size: var(--fz-lg);
    }
`;

export default HeaderLink;