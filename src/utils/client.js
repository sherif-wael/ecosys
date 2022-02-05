import axios from "axios";
import AppError from "./appError";

const ROOT_URL = process.env.REACT_APP_BASE_URL || "http://eco-sys-staging.eba-s6mcp2rd.eu-south-1.elasticbeanstalk.com";

console.log(process.env.REACT_APP_BASE_URL);

function client({ endpoint, method, headers, data }){
    const axiosConfig = {
        url: `${ROOT_URL}/${endpoint}`,
        method,
        headers,
        data
    };
    return axios(axiosConfig).then(axiosResponseMapper).catch(handleAxiosError);
}

function axiosResponseMapper(res){
    return {
        status: res.status,
        data: res.data,
        headers: res.headers,
        isError: res.status >= 300
    }
}

function handleAxiosError(err){
    if(err.response) return axiosResponseMapper(err.response);
    if(err.request) throw new AppError("network error, please try again!", "NETWORK_ERROR");
    throw new AppError("unexpected error while fetching...", "UNEXPECTED_ERROR");
}

export default client;