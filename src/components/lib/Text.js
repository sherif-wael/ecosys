import styled, { css } from "styled-components";

const sizes = {
    xxs: "var(--fz-xxs)",
    xs: "var(--fz-xs)",
    sm: "var(--fz-sm)",
    md: "var(--fz-md)",
    lg: "var(--fz-lg)",
    xl: "var(--fz-xl)",
    xxl: "var(--fz-xxl)",
    heading: "var(--fz-heading)"
}

const colors = {
    primary: "var(--primary-color)",
    white: "var(--white-color)",
}

function textFontSize(size = "md"){
    const fontSize = sizes[size];

    if(!fontSize){
        throw new Error(`Unrecognized font size ${size}`);
    }

    return fontSize;
}

function textColor(color = "primary"){
    const c = colors[color];

    if(!c){
        throw new Error(`Unrecognized text color ${color}`);
    }

    return c;
}

const Text = styled.p`
    margin: 0;
    line-height: 1.6;
    font-size: ${props => textFontSize(props.size)};
    color: ${props => textColor(props.color)};
`;

export default Text;

