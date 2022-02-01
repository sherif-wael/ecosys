import styled from "styled-components";
import AdminHeader from "components/lib/AdminHeader";
import RequestsTable from "./RequestsTable";
import RequestCard from "./RequestCard";
import AsyncContainer from "components/lib/AsyncContainer";
import { useRequests, useRequest } from "hooks/requests";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Requests(){
    const { data: requests, ...state } = useRequests();
    const { t } = useTranslation();

    console.log(requests);
    
    return (
        <>
            <AdminHeader title={t("requests")} /> 
            <Wrapper {...state}>
                {
                    requests && <RequestsTable requests={requests} />
                }
            </Wrapper>
        </>
    )
}

function Request(){
    const { id } = useParams();
    const { data: request, ...state } = useRequest(id);

    return (
        <RequestWrapper {...state} >
            {
                request && <RequestCard request={request} />
            }
        </RequestWrapper>
    )
}

const Wrapper = styled(AsyncContainer)`
    &.loading:not(.request){
        height: 200px;
    }
`;

const RequestWrapper = styled(AsyncContainer)`
    ${props => props.theme.mixins.flexCenter};
    min-height: 100vh;
    // background-color: var(--gray-color);
    background-color: var(--gradient);
`;

export {
    Requests,
    Request
}