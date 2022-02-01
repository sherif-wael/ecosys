import styled from "styled-components";

const FullPageSpinner = styled.div`
    min-height: 100vh;
    ${props => props.theme.mixins.flexCenter};
`;

export default FullPageSpinner;