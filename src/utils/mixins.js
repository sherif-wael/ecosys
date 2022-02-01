import { css } from "styled-components";

const mixins = {
    flexCenter: css`
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    flexVertCenter: css`
        display: flex;
        align-items: center;
    `,
    flexCol: css`
        display: flex;
        flex-direction: column;
    `,
    flexColCenter: css`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    flexSpaceBetween: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
    `,
    lgBtn: css`
        width: 200px;
        max-width: 100%;
        font-size: var(--fz-lg);
        border-radius: 5px;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    background: css`
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    `,
    formCard: css`
        background-color: #fff;
        padding: 32px;
        border-radius: 5px;
        margin: 0 0 50px;
    `,
    lightBorderInput: css`
        width: 300px;
        max-width: 100%;
        padding: 8px;
        background-color: #fff;
        border: 1px solid hsl(0deg, 0%, 80%);
    `,
    buttonDefaultStyles: css`
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: transparent;
    `
};

export default mixins;