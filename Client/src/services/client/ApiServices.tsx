import axios from "../../utils/CustomizeApi";

export const userRegister = async (username: string, email: string, password: string, phone: String, address: String) => {
    const response = await axios.post('user/register', { username, email, password, phone, address });
    return response.data;
}
export const userLogin = async (email: string, password: string) => {
    const response = await axios.post('user/login', { email, password });
    return response.data;
}


export const userProfile = async () => {
    const response = await axios.get('user/user-profile', { withCredentials: true });
    return response.data;
}


export const verifyEmail = async (otp: string, userId: string) => {
    const response = await axios.post('user/verify', { otp, userId }, { withCredentials: true });
    return response.data;
}

export const forgotPassword = async (email: string) => {
    return await axios.post('user/forgotPassword', { email }, { withCredentials: true });
}


export const otp = async (otp: string, email: string) => {
    const response = await axios.post('user/otp', { otp, email }, { withCredentials: true });
    return response.data;
}

export const resetPassword = async (password: string, confirmPassword: string, token: string) => {
    return await axios.post('user/resetPassword', { password, confirmPassword, token }, { withCredentials: true })
}