import useClient from "./useClient";
import { useQuery } from "react-query";

const defaultQueryConfig = {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60
};

function useDashboard(options = {}){
    const client = useClient({
        errors: {404: "Not Found!"}
    });
    
    return useQuery({
        queryKey: "dashboard",
        queryFn: () => client({endpoint: "api/admin_tool/dashboard/home", method: "GET"}).then(data => data.home),
        ...defaultQueryConfig,
        ...options
    });
}

export { 
    useDashboard
}