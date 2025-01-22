import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, RefreshControl, TextInput } from "react-native";
import Footer from "../../components/menus/footer";
import Banner from "../../components/banner/banner";
import ProductCard from "@/src/components/product/productCard";
import Tags from "@/src/components/product/tag";
import ProductModel from "@/src/components/product/productModal";
import Header from "@/src/components/menus/header";


const exampleProductData: ProductModel[] = [
  {
    _id: "1",
    productManager: "Alice Johnson",
    name: "Laptop XYZ Pro",
    price: 999.99,
    image: "https://example.com/laptop-image.jpg",
    description: "High-performance laptop with 16GB RAM, 512GB SSD, and Intel i7 processor.",
    category: "Electronics",
    quantity: 50,
    sold: 100,
    rating: 4.5,
    numReviews: 200,
    deleted: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    isFavorite: false,
  },
  {
    _id: "2",
    productManager: "Bob Smith",
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://example.com/headphones-image.jpg",
    description: "Noise-canceling wireless headphones with 20 hours of battery life.",
    category: "Accessories",
    quantity: 150,
    sold: 1200,
    rating: 4.7,
    numReviews: 500,
    deleted: false,
    createdAt: "2023-12-15T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
    isFavorite: true,
  },
  {
    _id: "3",
    productManager: "Charlie Davis",
    name: "Gaming Mouse",
    price: 49.99,
    image: "https://example.com/gaming-mouse.jpg",
    description: "Ergonomic gaming mouse with customizable RGB lighting and 16000 DPI.",
    category: "Gaming",
    quantity: 80,
    sold: 250,
    rating: 4.2,
    numReviews: 300,
    deleted: false,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2025-01-08T00:00:00Z",
    isFavorite: false,
  },
  {
    _id: "4",
    productManager: "Diana Green",
    name: "Smart Watch X1",
    price: 299.99,
    image: "https://example.com/smartwatch-image.jpg",
    description: "Smartwatch with heart rate monitor, sleep tracking, and GPS.",
    category: "Wearables",
    quantity: 120,
    sold: 450,
    rating: 4.8,
    numReviews: 800,
    deleted: false,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
    isFavorite: true,
  },
  {
    _id: "5",
    productManager: "Eve White",
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://example.com/speaker-image.jpg",
    description: "Portable Bluetooth speaker with waterproof design and 12 hours of playtime.",
    category: "Audio",
    quantity: 200,
    sold: 800,
    rating: 4.3,
    numReviews: 150,
    deleted: false,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2025-01-12T00:00:00Z",
    isFavorite: true,
  },
  {
    _id: "5",
    productManager: "Eve White",
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://example.com/speaker-image.jpg",
    description: "Portable Bluetooth speaker with waterproof design and 12 hours of playtime.",
    category: "Audio",
    quantity: 200,
    sold: 800,
    rating: 4.3,
    numReviews: 150,
    deleted: false,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2025-01-12T00:00:00Z",
    isFavorite: true,
  },
  {
    _id: "5",
    productManager: "Eve White",
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://example.com/speaker-image.jpg",
    description: "Portable Bluetooth speaker with waterproof design and 12 hours of playtime.",
    category: "Audio",
    quantity: 200,
    sold: 800,
    rating: 4.3,
    numReviews: 150,
    deleted: false,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2025-01-12T00:00:00Z",
    isFavorite: true,
  },
  {
    _id: "5",
    productManager: "Eve White",
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://example.com/speaker-image.jpg",
    description: "Portable Bluetooth speaker with waterproof design and 12 hours of playtime.",
    category: "Audio",
    quantity: 200,
    sold: 800,
    rating: 4.3,
    numReviews: 150,
    deleted: false,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2025-01-12T00:00:00Z",
    isFavorite: true,
  },
  {
    _id: "5",
    productManager: "Eve White",
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://example.com/speaker-image.jpg",
    description: "Portable Bluetooth speaker with waterproof design and 12 hours of playtime.",
    category: "Audio",
    quantity: 200,
    sold: 800,
    rating: 4.3,
    numReviews: 150,
    deleted: false,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2025-01-12T00:00:00Z",
    isFavorite: true,
  },
];

const HomeScreen: React.FC = () => {
  const [product, setProduct] = useState<ProductModel[] | null>(exampleProductData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleProductDetails = (item: ProductModel) => {
    console.log("Navigate to product details for:", item);
  };

  const toggleFavorite = (item: ProductModel) => {
    setProduct((prevProducts) =>
      prevProducts ? prevProducts.map((prod) =>
        prod._id === item._id
          ? {
            ...prod,
            isFavorite: !prod.isFavorite,
          }
          : prod
      ) : [] 
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View >
        <Header isCart={true} />
      </View>

      <View>
        <Banner />
      </View>

      <View style={styles.container}>
        <View>
          <Text style={styles.headingText}>Match Your Style</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.searchIcon} />
            <TextInput placeholder="Search" style={styles.textInput} />
          </View>
        </View>
        <Tags />


        <View style={styles.productList}>
          {product?.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              handleProductClick={handleProductDetails}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </View>
      </View>

      <View style={{ backgroundColor: "#ffffff" }}>
        <Footer />
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
