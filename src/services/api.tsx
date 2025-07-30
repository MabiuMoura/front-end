import axios, { AxiosError } from "axios";
import qs from "qs";
import Cookies from "js-cookie";
import { authEndpoints } from "./endpoints";
import { RoutePath } from "../shared/constants/enums";

const {
    VITE_LAPISCO_BACKEND_URL,
} = import.meta.env;

export const api = axios.create({
    baseURL: VITE_LAPISCO_BACKEND_URL,
    timeout: 60000,
    paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "brackets" });
    },
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((request) => {
        if (error) {
            request.reject(error);
        } else {
            request.resolve(token!);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
            processQueue(new Error("Refresh token não encontrado"));
            return Promise.reject(error);
        }

        try {
            const response = await authEndpoints.refreshToken(refreshToken);
            const { access_token, refresh_token } = response.data;

            Cookies.set("accessToken", access_token);
            Cookies.set("refreshToken", refresh_token);
            api.defaults.headers.Authorization = `Bearer ${access_token}`;

            processQueue(null, access_token);
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError);

            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            Cookies.remove("user");
            Cookies.remove("accessProfile");
            window.location.href = RoutePath.LOGIN;
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

const { get, post, put, delete: remove } = api;
export { get, post, put, remove };