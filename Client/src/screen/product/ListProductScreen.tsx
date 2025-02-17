import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigations/StackNavigator";
import ProductModel from "@/src/components/product/productModal";
import { getAllProductByCategory as GetPrdByCate, getAllProductBySubCategory as GetPrdBySubCate } from "@/src/services/client/ApiCategory_Product";
import ProductCard from "@/src/components/product/productCard";
type Props = StackScreenProps<RootStackParamList, "ListProduct">;

const ListProductScreen: React.FC<Props> = ({ route, navigation }) => {
    const { id } = route.params || {};
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchProducts = async (pageNumber: number) => {
        setLoading(true);
        try {
            let response = await GetPrdByCate(id, pageNumber);

            if (!response || response.length === 0) {
                response = await GetPrdBySubCate(id, pageNumber);
            }

            if (response.length === 0) {
                setHasMore(false);
            } else {
                setProducts((prevProducts) => [...prevProducts, ...response]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const loadMoreProducts = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (loading && products.length === 0) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (!products || products.length === 0) {
        return <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>;
    }

      const handleProductDetails = (item: ProductModel) => {
        navigation.navigate("ProductDetail", { id: item._id });
      };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Danh sách sản phẩm</Text>
            {products.map((product) => (
                <TouchableOpacity
                    key={product._id}
                    style={styles.productCard}
                    onPress={() => navigation.navigate("ProductDetail", { id: product._id })}
                >
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <View style={styles.productInfo}>
                        <Text style={styles.title}>{product.name}</Text>
                        <Text style={styles.price}>{product.price} VNĐ</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 160,
        width: "100%",
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
    },
    productCard: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productInfo: {
        marginLeft: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    price: {
        fontSize: 16,
        color: "green",
        marginTop: 4,
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
    loadMoreButton: {
        backgroundColor: "#007BFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 16,
    },
    loadMoreText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ListProductScreen;
