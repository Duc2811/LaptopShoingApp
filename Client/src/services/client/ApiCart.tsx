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


export const createOrder = async (orderData: {
    products: { productId: string; quantity: number; price: number }[];
    totalAmount: number;
    paymentMethod: "Wallet" | "COD" | "Bank Transfer";
    address?: string;
    note?: string;
}) => {
    try {
        const response = await axios.post("order/createOrder", orderData, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create order");
    }
};

export const vnPay = async (amount: number, bankCode: string, language: "vn") => {
    try {
        const response = await axios.post("payment/create_payment_url", { amount, bankCode, language }, { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        console.error("VNPay Payment Error:", error);
        throw new Error("Thanh toán VNPay thất bại!");
    }
};