import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getAllProductBySubCategory as GetProductBySubCategory } from "@/src/services/client/ApiCategory_Product";
import ProductCard from "@/src/components/product/productCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigations/RootStackParamList";

interface ProductByCategoryProps {
    id: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const ProductByCategory: React.FC<ProductByCategoryProps> = ({ id }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await GetProductBySubCategory(id, page);
                if (response && response.products) {
                    setProducts(response.products);
                } else {
                    console.error("Products not found in API response");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id, page]);

    const handleProductDetails = (item: any) => {
        navigation.navigate("ProductDetail", { id: item._id });
    };

    const renderItem = ({ item }: { item: any }) => (
        <ProductCard item={item} handleProductClick={handleProductDetails} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Products</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
            ) : products.length > 0 ? (
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.noProducts}>No products found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: '100%',
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#333",
    },
    listContainer: {
        paddingBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    noProducts: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#999",
        textAlign: "center",
        marginTop: 20,
    },
    loader: {
        marginTop: 20,
    },
});

export default ProductByCategory;
