import styled from "styled-components";
import Text from "components/lib/Text";
import Hero from "./Hero";
import About from "./About";
import Vision from "./Vision";
import Contact from "./Contact";

function Home(){
    return (
        <Wrapper>
            <Hero />
            <About />
            <Vision />
            <Contact />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    ${Text}{
        color: #fff;
    }

    color: #fff;
    button:focus,
    button:active{
        outline: none;
    }
`;

export {
    Home
}