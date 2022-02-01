import styled from "styled-components";
import MaxWidthWrapper from "components/lib/MaxWidthWrapper";
import { SectionHeading, SectionDescription } from "./SectionText";
import RocketImage from "static/rocket.svg";
import CheckedList from "./CheckedList";
import { useTranslation } from "react-i18next";

const features = [
    "mechanizedIndoorFarming",
    "renewableEnergySystems",
    "differentRecyclingSystems",
    "sustainableUnits",
    "waterConservation"
];

function About(){
    const { t } = useTranslation();

    return (
        <Wrapper maxWidth={1300} as="section" id="about">
            <Content>
                <SectionHeading as="h2">
                    {t("ourMission")}
                </SectionHeading>

                <SectionDescription>
                    {t("ourMissionDescription")}
                </SectionDescription>

                <CheckedList list={features.map(txt => t(txt))} />
            </Content>

            <Images>
                <div>
                    <img src={RocketImage} alt="Our Mission" />
                </div>
            </Images>
        </Wrapper>
    )
}

const Wrapper = styled(MaxWidthWrapper)`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 50px;
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
`;

const Images = styled.div`
    img{
        width: 100%;
        max-width: 500px;
    }
`;

export default About;