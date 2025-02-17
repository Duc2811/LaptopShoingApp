import { Image, StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import React from "react";
import Product from "./productModal";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native";

import { addToCart } from "../../store/reducer/cartReducer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/RootStackParamList";
type ProductCardProps = {
  item: Product;
  handleProductClick: (item: Product) => void;
};
type NavigationProp = StackNavigationProp<RootStackParamList, "Cart">;

const ProductCard: React.FC<ProductCardProps> = ({ item, handleProductClick }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: item._id,
      name: item.name,
      price: item.price ? Number(item.price) : 0,
      image: item.image,
      quantity: 1
    }));
    navigation.navigate("Cart");
  };



  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleProductClick(item)}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <Text numberOfLines={2} style={styles.productName}>
            {item.description}
          </Text>

          <Text style={styles.productPrice}>
            ${item.price ? item.price.toFixed(2) : "0.00"}
          </Text>

          <Text style={styles.soldText}>{item.sold || 0} sold</Text>
        </View>
      </TouchableOpacity>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </ScrollView>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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