import client from "./client";
import AppError from "./appError";
import { toast } from "react-toastify";

const AUTH_USER_KEY = "AUTH_USER";

const getAuthUser = () => {
    const user = window.localStorage.getItem(AUTH_USER_KEY);

    return user ? JSON.parse(user) : undefined;
}

const setAuthUser = user => {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

const removeAuthUser = () => window.localStorage.removeItem(AUTH_USER_KEY);

function login(userData){
    return client({
        endpoint: "api/v1/users/login",
        method: "POST",
        data: userData
    })
    .then(handleLoginResponse)
    .catch(err => {
        if(err.type === "NETWORK_ERROR") toast.error(err.message)
        else throw err;
    })
}

function handleLoginResponse(res){
    if(res.status === 422){
        throw new AppError("invalid email or password", "INVALID_INPUT");
    }

    const { user } = res.data;

    setAuthUser(user);

    return user;
}

async function logout(){
    removeAuthUser();
}

export {
    login,
    logout,
    getAuthUser,
    setAuthUser
}