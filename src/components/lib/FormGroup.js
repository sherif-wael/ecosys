import styled from "styled-components";
import Text from "./Text";
import Spacer from "./Spacer";
import FormError from "./FormError"

function FormGroup({
    label,
    name,
    error,
    className,
    customInput,
    ...inputProps
}){
    return (
        <Wrapper className={className}>
            <Label size="xl" htmlFor={name} as="label">{label}</Label>
            <Spacer size={5} />
            {
                customInput
                ||
                <Input 
                    id={name}
                    name={name}
                    {...inputProps}
                />
            }
            <FormError error={error} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    ${props => props.theme.mixins.flexCol};
`;

const Label = styled(Text)`
    font-weight: 700;
    letter-spacing: 0.4px;
`;

const Input = styled.input`
    background-color: var(--gray-color);
    font-size: var(--fz-md);
    padding: 10px 8px;
    border-radius: 3px;
`;

export default FormGroup;