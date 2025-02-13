import axios from "axios";
import { store } from "../store/store";
import { Platform } from "react-native";


const apiBackend = Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_API_URL
    : process.env.EXPO_PUBLIC_IOS_API_URL

const ApiServices = "http://localhost:3000/api/"

const instance = axios.create({
    baseURL: ApiServices,
    // headers: {
    //     "Content-Type": 'application/json',
    // }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const token = store.getState().user?.user?.token;

    if (token) {
        // Kiểm tra và đảm bảo headers tồn tại trước khi gán
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lies within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;
