import styled from "styled-components";
import Text from "./Text";

function FormError({ error }){
    if(!error) return null;
    return <ErrorText size="xs" className="form-error">*{error}</ErrorText>
}

const ErrorText = styled(Text)`
    color: red;
    padding: 5px 0 0;
`;

export default FormError;