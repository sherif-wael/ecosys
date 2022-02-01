import { Outlet, Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Layout from "./Layout";

function PublicRoute(){
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

function PrivateRoute(){
    const { user } = useAuth();

    if(!user){
        return <Navigate to="/" />
    }

    return (
        <Layout isPrivate>
            <Outlet />
        </Layout>
    )
}

function withPrivateRoute(Page){
    return function(){
        const { user } = useAuth();

        return user ? <Page /> : <Navigate to="/" />
    }
}

export {
    PrivateRoute,
    PublicRoute,
    withPrivateRoute
}