import styled from "styled-components";

const MaxWidthWrapper = styled.div`
    max-width: ${props => props.maxWidth}px;
    margin: 0 auto;
    padding: 0 16px;

    @media (min-width: 563px){
        padding: 0 32px;
    }
`;

export default MaxWidthWrapper;