import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        // --primary-color: #78B72A;
        --primary-color: #111;
        --gray-color: #E2E2E2;
        --white-color: #fff;
        --dark-green: #3D7400;
        --light-green: hsl(87, 63%, 80%);
        --light-gray: hsl(0deg, 0%, 97%);
        --fz-xxs: 12px;
        --fz-xs: 13px;
        --fz-sm: 14px;
        --fz-md: 16px;
        --fz-lg: 18px;
        --fz-xl: 20px;
        --fz-xxl: 22px;
        --fz-heading: 32px;
        --sidebar-width: 300px;
        --bg-gradient: linear-gradient(90deg, rgba(120, 183, 42, 0.6) -48.17%, rgba(37, 141, 194, 0.6) 145.7%);
    }

    body{
        margin: 0;
        overflow-x: hidden;
        font-family: 'Roboto', sans-serif;
        direction: ${props => props.theme.isArabic ? "rtl" : "ltr"};
    }

    *,
    *::after,
    *::before{
        box-sizing: border-box;
    }

    img{
        max-width: 100%;
        vertical-align: middle;
    }
    
    input:focus,
    input:active,
    textarea:focus,
    textarea:active,
    select:focus,
    select:active{
        // outline: none;
    }

    input,
    button{
        border: none;
    }

    button{
        cursor: pointer;
    }

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }

    a,
    button,
    select,
    input,
    textarea{
        -webkit-tap-highlight-color: transparent;
    }

    .fadeup-enter{
        opacity: 0;
        transform: translateY(20px);
    }

    .fadeup-enter-active{
        opacity: 1;
        transform: translateY(0px);
        transition: opacity 300ms, transform 300ms;
    }

    .fadeup-exit{
        opacity: 1;
        transform: translateY(0px);
    }

    .fadeup-exit-active{
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 300ms, transform 300ms;
    }

    // .fadeleft-enter{
    //     opacity: 0;
    //     transform: translateX(-30px);
    // }

    // .fadeleft-enter-active{
    //     opacity: 1;
    //     transform: translateX(0px);
    //     transition: opacity 1s, transform 1s;
    // }

    .fadeleft-exit{
        opacity: 1;
        transform: translateY(0px);
    }

    .fadeleft-exit-active{
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 1s, transform 1s;
    }

    textarea,
    button,
    input,
    select{
        font-family: inherit;
    }
`;

export default GlobalStyle;