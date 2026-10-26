import axios from 'axios';
import { env } from './env';

 const api = axios.create({
    baseURL: `${env.viteServerUri}/api/v1`,
    withCredentials: true
})

export let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
    return accessToken;
};

export const clearAccessToken = () => {
    accessToken = null;
};


api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});


let refreshPromise = null;

const refreshAccessToken = async () => {

    if (!refreshPromise) {

        refreshPromise = api
            .get("/auth/regenerate-access-token")
            .then((response) => {

                const newAccessToken =
                    response.data.accessToken;

                setAccessToken(newAccessToken);

                return newAccessToken;

            })
            .finally(() => {

                refreshPromise = null;

            });
    }

    return refreshPromise;
};


api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            error.response?.data?.code === "ACCESS_TOKEN_EXPIRED" &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const newAccessToken =
                    await refreshAccessToken();

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {

                clearAccessToken();

                if(window.location.pathname !== "/") window.location.href = "/";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export {api};

