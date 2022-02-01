import styled from "styled-components";
import { SectionDescription, SectionHeading } from "./SectionText";
import MaxWidthWrapper from "components/lib/MaxWidthWrapper";
import VisionImage from "static/vision.png";
import { useTranslation } from "react-i18next";

function Vision(){
    const { t } = useTranslation();

    return (
        <Wrapper maxWidth={1300}>
            <Content>
                <SectionHeading as="h2">
                    {t("ourVision")}
                </SectionHeading>

                <SectionDescription>
                    {t("ourVisionDescription")}
                </SectionDescription>
            </Content>

            <Images>
                <div>
                    <img src={VisionImage} />
                </div>
            </Images>
        </Wrapper>
    )
}

const Wrapper = styled(MaxWidthWrapper)`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 50px;
    align-items: center;
    justify-items: center;
    padding-bottom: 100px;

    @media (min-width: 1024px){
        grid-template-columns: 1fr 1fr;
    }
`;

const Content = styled.div`
    ${SectionDescription}{
        margin: 0 0 30px;
    }

    @media (min-width: 1024px){
        order: 1;
    }
`;

const Images = styled.div`
    div{
        max-width: 500px;
    }

    @media (min-width: 1024px){
        order: 0;
    }
`;

export default Vision;