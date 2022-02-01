import React from "react";
import * as auth from "utils/auth";
import useAsync from "hooks/useAsync";
import FullPageSpinner from "components/lib/FullPageSpinner";
import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
export const AuthContext = React.createContext();

function FullPageError({ error }){
    return (
        <p>An Error has occured</p>
    )
}

async function bootstrap(onBootstrap){
    const user = auth.getAuthUser();

    if(user){
        onBootstrap(user);
    }

    return user ? user : null;
}

function AuthProvider(props){
    const { data: user, isLoading, isIdle, isError, error, setData, run } = useAsync();
    const queryClient = useQueryClient();
    const { i18n } = useTranslation();

    React.useEffect(
        () => {
            run(bootstrap(user => i18n.changeLanguage(user.locale)));
        },
        []
    );

    const login = React.useCallback(
        userData => auth.login(userData).then(user => setData(user)),
        []
    );

    const logout = React.useCallback(
        () => auth.logout().then(() => {
            setData(null);
            queryClient.clear();
        }),
        []
    );

    const setUser = React.useCallback(
        userData => {
            const newUser = {...user, ...userData};
            auth.setAuthUser(newUser);
            setData(newUser);
        },
        [user]
    );

    const value = {user, login, logout, setUser};

    if(isLoading || isIdle){
        return <FullPageSpinner />
    }

    if(isError){
        return <FullPageError error={error} />
    }

    return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider;