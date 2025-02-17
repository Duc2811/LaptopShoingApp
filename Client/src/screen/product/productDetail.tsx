import { Star } from "lucide-react-native";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigations/StackNavigator";
import { getProductById as ProductByID } from "@/src/services/client/ApiCategory_Product";
import React, { useEffect, useState } from "react";
import ProductModel from "@/src/components/product/productModal";

type Props = StackScreenProps<RootStackParamList, "ProductDetail">;

const ProductDetail: React.FC<Props> = ({ route }) => {
    const { id } = route.params;
    const [product, setProduct] = useState<ProductModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductByID(id);
                setProduct(response);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (!product) {
        return <Text style={styles.errorText}>Product not found</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={24}
                        color={star <= (product?.rating ?? 0) ? "#FFD700" : "#000"}
                        fill={star <= (product?.rating ?? 0) ? "#FFD700" : "none"}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#555",
        marginBottom: 12,
    },
    ratingContainer: {
        flexDirection: "row",
        gap: 5,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
});

export default ProductDetail;
