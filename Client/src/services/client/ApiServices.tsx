import axios from "../../utils/CustomizeApi";

export const userRegister = async (username: string, email: string, password: string, phone: String, address: String) => {
    const response = await axios.post('user/register', { username, email, password, phone, address });
    return response.data;
}
export const userLogin = async (email: string, password: string) => {
    const response = await axios.post('user/login', { email, password });
    return response.data;
}
export const userForgotPassword = async (email: string) => {
    const response = await axios.post('user/forgot-password', { email });
    return response.data;
}

export const userOtp = async (email: string, otp: string) => {
    const response = await axios.post('user/otp', { email, otp }, { withCredentials: true });
}