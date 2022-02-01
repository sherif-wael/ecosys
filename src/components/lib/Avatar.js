import styled from "styled-components";

function Avatar({ size = 40, photo, name }){
    return (
        photo ? 
            <Round as="img" src={photo} alt="avatar" size={size} />
            :
            <Letter size={size}>{name[0]}</Letter>
    )
}

const Round = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: 50%;
`;

const Letter = styled(Round)`
    ${props => props.theme.mixins.flexCenter};
    color: var(--white-color);
    background-color: var(--dark-green);
    font-weight: 500;
    font-size: var(--fz-lg);
`;

export default Avatar;