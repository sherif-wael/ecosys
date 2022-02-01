import React from "react";
import client from "utils/client";
import useAuth from "./useAuth";
import AppError from "utils/appError";

const errorTypes = {
    404: "NOT_FOUND"
};

function useClient({ errors = {}, onResponse } = {}){
    const { user, logout } = useAuth();
    const headers = user && user.token ? {"Authorization": `Token token=${user.token}`} : undefined;

    const handleResponse = React.useCallback(
        res => {
            if(onResponse) onResponse(res);

            if(res.status === 401 && user){
                logout();
                throw new AppError("Token has expired, please reauthenticate", "UNAUTHORIZED");
            }

            if(res.status === 401){
                throw new AppError("Unauthorized please login", "UNAUTHORIZED")
            }

            if(res.isError){
                const msg = errors[res.status] || "unexpected error has occured!";
                const type = errorTypes[res.status] || "UNEXPECTED_ERROR";
                throw new AppError(msg, type);
            }

            return res.data;
        },
        [errors, onResponse]
    );

    return React.useCallback(
        clientOpts => {
            const newHeaders = {...headers, ...clientOpts.headers};
            return client({...clientOpts, headers: newHeaders}).then(handleResponse);
        },
        []
    );
}

export default useClient;