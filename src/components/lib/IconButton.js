import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProceedDialog from "./ProceedDialog";
import trash from "static/delete.svg";
import edit from "static/edit.svg";
import view from "static/view.svg";
import { BiChevronRight as RightChevron } from "react-icons/bi";
import { BiChevronLeft as LeftChevron } from "react-icons/bi"; 

const types = {
    delete: {
        icon: (<img src={trash} />),
        color: "#DC3545"
    },
    edit: {
        icon: (<img src={edit} />),
        color: "#1EC882"
    },
    view: {
        icon: (<img src={view} />),
        color: "#17A2B8"
    },
    rightChevron: {
        icon: (<RightChevron />),
        color: "var(--light-gray)"
    },
    leftChevron: {
        icon: (<LeftChevron />),
        color: "var(--light-gray)"
    }
};

function IconButton({ type, ...delegated }){
    const buttonType = types[type];

    if(!buttonType){
        throw new Error(`invalid button type: ${type}`);
    }

    return (
        <Button color={buttonType.color} {...delegated}>
            <span className="icon">{buttonType.icon}</span>
        </Button>
    )
}

export function View({ to, ...delegated }){
    return (
        <Link to={to}>
            <IconButton type="view" {...delegated} />
        </Link>
    )
}

export function Delete(props){
    return (
        <ProceedDialog {...props}>
            <IconButton type="delete" />
        </ProceedDialog>
    )
}

const Button = styled.button`
    ${props => props.theme.mixins.flexCenter};
    background-color: ${props => props.color};
    width: 38px;
    height: 38px;
    color: #fff;    
    border-radius: 5px;
`;

export default IconButton;