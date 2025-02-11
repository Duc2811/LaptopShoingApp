import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Product from "./productModal";

type ProductCardProps = {
  item: Product;
  handleProductClick: (item: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ item, handleProductClick }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleProductClick(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text numberOfLines={2} style={styles.productName}>
          {item.description}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.soldText}>{item.sold || 0} sold</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF5722",
    marginBottom: 4,
  },
  soldText: {
    fontSize: 12,
    color: "#999",
  },
});
