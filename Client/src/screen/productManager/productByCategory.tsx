import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getAllProductBySubCategory as GetProductBySubCategory } from "@/src/services/client/ApiCategory_Product";

interface ProductByCategoryProps {
    id: string;
}

const ProductByCategory: React.FC<ProductByCategoryProps> = ({ id }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!id) return; 
            try {
                const response = await GetProductBySubCategory(id, page);
                console.log("API Response:", response);
                if (response && response.products) {
                    setProducts(response.products); 
                } else {
                    console.error("Products not found in API response");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchProducts();
    }, [id, page]);
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Products for SubCategory</Text>
            {products.length > 0 ? (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                            />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                            <Text style={styles.description} numberOfLines={2}>
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.noProducts}>No products found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
        color: "#333",
    },
    row: {
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 15,
        width: "48%",
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 120,
        borderRadius: 8,
        resizeMode: "cover",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        color: "#333",
        textAlign: "center",
    },
    price: {
        fontSize: 14,
        fontWeight: "600",
        color: "#007BFF",
        marginVertical: 5,
    },
    description: {
        fontSize: 12,
        color: "#777",
        textAlign: "center",
    },
    noProducts: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#999",
        textAlign: "center",
        marginTop: 20,
    },
});

export default ProductByCategory;
