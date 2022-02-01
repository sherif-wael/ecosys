import styled from "styled-components";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

function AsyncContainer({
    isLoading,
    isError,
    children,
    error,
    className
}){
    if(isLoading){
        return (
            <Wrapper className={`loading ${className}`}>
                <Spinner borderWidth={4} />
            </Wrapper>
        )
    }

    if(isError){
        return (
            <Wrapper className={`error ${className}`}>
                <ErrorMessage error={error} />
            </Wrapper>
        )
    }

    return (
        <Wrapper className={`success ${className}`}>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.loading,
    &.error{
        ${props => props.theme.mixins.flexCenter}
    }

    &.error{
        text-align: center;
    }
`;

export default AsyncContainer;