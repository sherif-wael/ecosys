import styled from "styled-components";

const Spinner = styled.div`
    width: ${props => props.size || 30}px;
    height: ${props => props.size || 30}px;
    border-radius: 50%;
    border: ${props => props.borderWidth || 2}px solid var(--primary-color);
    border-top: ${props => props.borderWidth || 2}px solid var(--dark-green);
    animation: rotate 3s ease infinite;

    @keyframes rotate{
        100%{transform: rotate(360deg)}
    }
`; 

export default Spinner;