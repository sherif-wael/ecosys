import styled from "styled-components";
import { useParams } from "react-router-dom";
import CommunitiesTable from "./CommunitiesTable";
import CommunityCard from "./CommunityCard";
import { useStories, useRequest } from "hooks/requests";
import AdminHeader from "components/lib/AdminHeader";
import AsyncContainer from "components/lib/AsyncContainer";
import { useTranslation } from "react-i18next";

function Communities(){
    const { data: communities, ...state } = useStories();
    const { t } = useTranslation();

    return (
        <>
            <AdminHeader title={t("community")} /> 
            <Wrapper {...state}>
                {
                    communities && <CommunitiesTable communities={communities} />
                }
            </Wrapper>
        </>
    )
}

function Community(){
    const { id } = useParams();
    const { data: community, ...state } = useRequest(Number(id));
    const { t } = useTranslation();
    
    return (
        <>
            <AdminHeader title={t("community")} />
            <Wrapper {...state}>
                {
                    community && <CommunityCard community={community} />
                }
            </Wrapper>
        </>
    )
}

const Wrapper = styled(AsyncContainer)`
    &.loading{
        height: 200px;
    }
`;

export {
    Communities,
    Community
}