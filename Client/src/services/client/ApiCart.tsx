import axios from "../../utils/CustomizeApi";


export const getCart = async () => {
    const response = await axios.get(`cart/getCart`, { withCredentials: true });
    return response.data;
}

export const addToCart = async (data: any) => {
    const response = await axios.post(`cart/addToCart`, {}, { withCredentials: true });
    return response.data;
}

export const clearCart = async (id: string) => {
    const response = await axios.delete(`cart/clearCart/${id}`, { withCredentials: true });
    return response.data;
}

export const updateCart = async (id: string, data: any) => {
    const response = await axios.put(`cart/updateCart/${id}`, data, { withCredentials: true });
    return response.data;
}