import React from "react";
import styled from "styled-components";
import Text from "components/lib/Text";
import dropdownIcon from "static/dropdown.svg"
import useClickAwayListener from "hooks/useClickAwayListener";
import { useEditRequestStatus } from "hooks/requests";

const statusOptions = [
    {
        label: "Open",
        value: "open"
    },
    {
        label: "In Progress",
        value: "in_progress"
    },
    {
        label: "Complete",
        value: "complete"
    },
    {
        label: "Stalled",
        value: "stalled"
    }
]

function RequestStatus({ status, request }){
    const [isOpened, setIsOpened] = React.useState(false);
    const wrapperRef = useClickAwayListener(() => setIsOpened(false));
    const { mutate: editStatus } = useEditRequestStatus(request);

    const filteredStatusOptions = statusOptions.filter(opt => opt.value !== status);

    const handleOptionClick = value => editStatus(value);

    return (
        <Wrapper 
            onClick={() => setIsOpened(!isOpened)}
            ref={wrapperRef}
        >
            <Text as="span" size="md" className="status">{statusOptions.find(opt => opt.value === status).label}</Text>
            <img src={dropdownIcon} />

            {
                isOpened 
                &&
                <ul className="dropdown-list">
                    {
                        filteredStatusOptions.map(opt => (
                            <li onClick={() => handleOptionClick(opt.value)} key={opt.value}>{opt.label}</li>
                        ))
                    }
                </ul>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    ${props => props.theme.mixins.flexVertCenter};
    display: inline-block;
    cursor: pointer;
    position: relative;

    .status{
        margin-inline-end: 10px;
    }

    .dropdown-list{
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 150px;
        padding: 16px 0;
        background-color: #fff;
        box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.1);
        border-radius: 5px;
        z-index: 10;
    }

    .dropdown-list li{
        padding: 8px 16px;

        &:hover{
            background-color: var(--light-gray);
        }
    }
`;

export default RequestStatus;