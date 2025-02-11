export default interface ProductModel {
    _id: string;
    productManager: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    quantity: number;
    sold?: number; 
    rating?: number; 
    numReviews?: number; 
    deleted?: boolean; 
    createdAt?: string; 
    updatedAt?: string; 
}