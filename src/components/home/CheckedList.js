import styled from "styled-components";
import Text from "components/lib/Text";
import { GiCheckMark as CheckIcon } from "react-icons/gi";

function CheckedList({ list, ...delegated }){
    return (
        <Wrapper>
            {
                list.map((item, index) => (
                    <li key={index}>
                        <CheckIcon className="icon" />
                        <Text as="span" size="md">{item}</Text>
                    </li>
                ))
            }
        </Wrapper>
    )
}

const Wrapper = styled.ul`
    .icon{
        font-size: 16px;
        flex-shrink: 0;
        margin-inline-end: 16px;
        color: #258DC2;
    }

    li{
        ${props => props.theme.mixins.flexVertCenter};
        margin: 0 0 10px;
    }
`;

export default CheckedList;