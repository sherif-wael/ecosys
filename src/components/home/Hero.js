import React from "react";
import styled, { css } from "styled-components";
import Text from "components/lib/Text";
import MaxWidthWrapper from "components/lib/MaxWidthWrapper";
import WateredPlant from "static/watered-plants.jpg";
import PlantPots from "static/plant-pots.jpg";
import { FiArrowRight as ArrowRightIcon } from "react-icons/fi";
import { useBoopWithClick } from "hooks/useBoop";
import { CSSTransition } from "react-transition-group";
import { SectionHeading, SectionDescription } from "./SectionText";
import { useTranslation } from "react-i18next";

function IntroSection(){
    const [isHidden, setIsHidden] = React.useState(true);
    const boopProps = useBoopWithClick();
    const { t } = useTranslation();

    return (
        <Wrapper maxWidth={1300} as="section">
            <Content>
                <SectionHeading as="h2">
                    {t("whoWeAre")}
                </SectionHeading>

                <SectionDescription>
                    {t("heroDescription")}
                </SectionDescription>

                <CSSTransition in={!isHidden} classNames="fadeup" timeout={200} unmountOnExit>
                    <SectionDescription>
                        {t("heroSeeMoreDescription")}
                    </SectionDescription>
                </CSSTransition>

                <SeeMore {...boopProps} onClick={() => setIsHidden(!isHidden)}>
                    <Text size="lg" as="span">{isHidden ? t("seeMore") : t("seeLess")}</Text>
                    <span className="icon"><ArrowRightIcon /></span>
                </SeeMore>
            </Content>

            <Images>
                <div className="imgs-wrapper">
                    <div className="left">
                        <img src={WateredPlant} alt="Some watered plants" />
                    </div>
                    <div className="right">
                        <img src={PlantPots} alt="Some plants in their pots" />
                    </div>
                </div>
            </Images>
        </Wrapper>
    )
}

const Wrapper = styled(MaxWidthWrapper)`
    padding-top: 60px;
    padding-bottom: 150px;
    display: grid;
    grid-gap: 20px;
    justify-items: center;
    overflow-x: hidden;
    
    @media (min-width: 1024px){
        padding-top: 100px;
        grid-template-columns: 1fr 1fr;
        grid-gap: 100px;
    }
`;

const Content = styled.div`
    ${SectionHeading}{
        @media (min-width: 1024px) and (max-width: 1240px){
            font-size: 48px;
        }    
    }

    ${SectionDescription}{
        margin: 0 0 30px;

        @media (min-width: 768px){
            margin: 0 0 40px;
        }
    }
`;

const SeeMore = styled.button`
    ${props => props.theme.mixins.buttonDefaultStyles};
    color: #fff;
    line-height: 0;
    padding: 0;
    margin: 0 0 30px;
    border: 1px solid #258DC2;
    border-radius: 30px;
    will-change: transform;
    transition: transform 200ms ease;
    backface-visibility: hidden;
    box-shadow: 5px 5px 15px rgb(0, 0, 0, 0.1);
    
    ${Text}{
        width: 130px;
    }

    .icon{
        ${props => props.theme.mixins.flexCenter};
        background-color: #258DC2;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 18px;
        transform: ${props => props.theme.isArabic && "rotateY(180deg)"};
    }
`;

const Images = styled.div`
    ${props => props.theme.mixins.flexCenter}
    align-items: flex-start;

    .imgs-wrapper{
        position: relative;
    }

    .left, .right{
        max-width: 75%;
    }

    .right{
        position: absolute;
        top: 80px;
        ${props => (
            props.theme.isArabic ? 
                css`
                    left: -50px;
                `
                :
                css`
                    right: -50px;
                `
        )}
    }

    img{
        box-shadow: 5px 5px 15px rgb(0, 0, 0, 0.1);
        border-radius: 30px;
    }
`;

export default IntroSection;