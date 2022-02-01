import styled from "styled-components";
import Text from "components/lib/Text";

const SectionHeading = styled(Text)`
    font-size: 36px;
    line-height: 1.3;
    text-transform: capitalize;
    margin: 0 0 30px;
    max-width: 600px;

    span{
        color: #258DC2;
    }

    @media (min-width: 480px){
        font-size: 48px;
    }

    @media (min-width: 768px){
        font-size: 64px;
    }
`;

const SectionDescription = styled(Text)`
    font-size: ${props => props.theme.isArabic ? "20px" : "16px"};
    max-width: 600px;

    @media (min-width: 768px){
        font-size: ${props => props.theme.isArabic ? "22px" : "18px"};
    }
`;

export {
    SectionHeading,
    SectionDescription
};