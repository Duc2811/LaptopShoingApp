import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ProductModel from "./productModal";

interface ProductDetailsProps {
  product: ProductModel;  
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [qty, setQty] = useState(1);

  const handleAddQty = () => {
    if (qty === 10) return alert("You can't add more than 10 quantity");
    setQty((prev) => prev + 1);
  };

  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product?.image }} style={styles.image} />
      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.title}>Price: {product?.price} $</Text>
      <Text style={styles.desc}>{product?.description}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnCart}
          onPress={() => alert(`${qty} items added to cart`)}
          disabled={product?.quantity <= 0}
        >
          <Text style={styles.btnCartText}>
            {product?.quantity > 0 ? "ADD TO CART" : "OUT OF STOCK"}
          </Text>
        </TouchableOpacity>
        <View style={styles.qtyContainer}>
          <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
            <Text style={styles.btnQtyText}>-</Text>
          </TouchableOpacity>
          <Text>{qty}</Text>
          <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
            <Text style={styles.btnQtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  desc: {
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "justify",
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnCart: {
    width: 180,
    backgroundColor: "#000000",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
  },
  btnCartText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: 40,
    alignItems: "center",
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
  },
});

export default ProductDetails;
