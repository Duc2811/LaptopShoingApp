import axios from "../../utils/CustomizeApi";


export const getAllCategory = async () => {
    const response = await axios.get('category/getAllCategory', { withCredentials: true });
    return response.data;
}

export const getSubCategory = async (id: string) => {
    const response = await axios.get(`category/getSubCategory/${id}`, { withCredentials: true });
    return response.data;
}


export const addCategory = async (name: string, description: string, image: string) => {
    const response = await axios.post('category/addCategory', { name, description, image }, { withCredentials: true });
    return response.data;
}

export const updateCategory = async (id: string, name: string, description: string, image: string) => {
    const response = await axios.put(`category/updateCategory/${id}`, { name, description, image }, { withCredentials: true });
    return response.data;
}

export const managerDeleteCategory = async (id: string) => {
    const response = await axios.delete(`category/managerDeleteCategory/${id}`, { withCredentials: true });
    return response.data;
}

export const adminDeleteCategory = async (id: string) => {
    const response = await axios.delete(`category/adminDeleteCategory/${id}`, { withCredentials: true });
    return response.data;
}

export const addSubCategory = async (id: string, name: string, description: string, image: string) => {
    const response = await axios.post(`category/addSubCategory/${id}`, { name, description, image }, { withCredentials: true });
    return response.data;
}

export const updateSubCategory = async (id: string, name: string, description: string, image: string) => {
    const response = await axios.put(`category/updateSubCategory/${id}`, { name, description, image }, { withCredentials: true });
    return response.data;
}

export const deleteSubCategory = async (id: string) => {
    const response = await axios.delete(`category/managerDeleteSubCategory/${id}`, { withCredentials: true });
    return response.data;
}


export const getAllProduct = async (page: number) => {
    const response = await axios.get('product/getAllProduct', { params: { page }, withCredentials: true });
    return response.data;
}

export const getAllProductByCategory = async (category: string, page: number) => {
    const response = await axios.get(`getProductByCategory/${category}`, { params: { page }, withCredentials: true });
    return response.data;
}

export const getAllProductBySubCategory = async (id: string, page: number) => {
    const response = await axios.get(`product/getProductBySubCategory/${id}`, { params: { page }, withCredentials: true });
    return response.data;
}

export const getProductById = async (id: string) => {
    const response = await axios.get(`product/getProductById/${id}`, { withCredentials: true });
    return response.data;
}

export const getTop8 = async () => {
    const response = await axios.get(`product/getTop8`, { withCredentials: true });
    return response.data;
}

export const getTopSold = async () => {
    const response = await axios.get(`product/getTopSold`, { withCredentials: true });
    return response.data;
}

export const getTopView = async () => {
    const response = await axios.get(`product/getTopView`, { withCredentials: true });
    return response.data;
}

export const searchProduct = async (data: { name: string; description: string }, page: number) => {
    return await axios.post(`product/search`, data, { params: { page }, withCredentials: true });
}

export const addProduct = async (id: string, data: { name: string; description: string; price: number; image: string; quantity: number; }) => {
    const response = await axios.post(`product/addProduct/${id}`, data);
    return response.data;
}

export const updateProduct = async (id: string, data: { name: string; description: string; price: number; image: string; quantity: number; }) => {
    const response = await axios.put(`product/updateProduct/${id}`, data);
    return response.data;
}

export const managerDeleteProduct = async (id: string) => {
    const response = await axios.delete(`product/managerDelete/${id}`);
    return response.data;
}

export const adminDeleteProduct = async (id: string) => {
    const response = await axios.delete(`product/adminDelete/${id}`);
    return response.data;
}