import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

function StoreProvider(props){
    return (
        <QueryClientProvider client={queryClient} {...props} />
    )
}

export default StoreProvider;