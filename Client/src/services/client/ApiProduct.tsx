import axios from "../../utils/CustomizeApi";

export const getAllProduct = async () => {
    const response = await axios.get('product/get-all-product', { withCredentials: true });
    return response.data;
}

export const getAllCategory = async () => {
    const response = await axios.get('category/getAllCategory', { withCredentials: true });
    return response.data;
}