import { useQuery } from "react-query";
import useClient from "./useClient";

const fakeCommunities = [{id: 1, name: "Community Test1", title: "Yes it is"}];

const defaultQueryConfig = {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60
};

function useCommunities(options = {}){
    const client = useClient({
        errors: {404: "no communities found yet!"}
    });
    
    return useQuery({
        queryKey: "communities",
        queryFn: () => new Promise(resolve => resolve(fakeCommunities)),
        ...defaultQueryConfig,
        ...options
    })
}

function useCommunity(communityId, options = {}){
    const client = useClient({
        errors: {404: "community not found! failed to fetch"}
    });

    return useQuery({
        queryKey: ["community", { communityId }],
        queryFn: () => new Promise(resolve => resolve(fakeCommunities.find(c => c.id === communityId))),
        ...defaultQueryConfig,
        ...options
    });
}

export {
    useCommunities,
    useCommunity
}