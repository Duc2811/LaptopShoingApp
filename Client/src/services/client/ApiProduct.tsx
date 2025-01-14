import axios from "../../utils/CustomizeApi";

export const getAllCategory = async () => {
    const response = await axios.get('category/getAllCategory', { withCredentials: true });
    return response.data;
}

export const getAllProduct = async (page: number) => {
    const response = await axios.get('product/getAllProduct', { params: { page }, withCredentials: true });
    return response.data;
}


export const getAllProductByCategory = async (param: string, page: number) => {
    const response = await axios.get(`product/getProductByCategory${param}`, { params: { page }, withCredentials: true });
    return response.data;
}

export const searchProduct = async (data: { name: string; description: string }) => {
    return await axios.post(`product/search`, data);
}