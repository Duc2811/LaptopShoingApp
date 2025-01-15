import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, RefreshControl } from "react-native";
import Footer from "../../components/menus/footer";
import Banner from "../../components/banner/banner";
import ProductDetails from "../../components/product/productDetail";
import { getAllProduct } from "../../services/client/ApiProduct";
import ProductModel from "../../components/product/productModal";

const HomeScreen: React.FC = () => {
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const products = await getAllProduct(1);
        if (products.data && products.data.length > 0) {
          setProduct(products.data[0]);
        } else {
          alert("No products found.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Banner />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://i5.walmartimages.com/asr/3e546ff9-e1ea-458c-8ac5-671673a05fd2_1.93edbfcf20424e848d07e685a4a0e2e1.jpeg",
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.dhgcogyWQyBNArDLiWWOlwHaHa?rs=1&pid=ImgDetMain",
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.F2OfONJmoDM4DWW0FNs-1gHaE8?w=246&h=180&c=7&r=0&o=5&pid=1.7",
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://s.alicdn.com/@sc04/kf/H3bb6a57e9a834cd9b68db3511cfadc97r.jpg_300x300.jpg",
          }}
          style={styles.image}
        />
      </View>

      {product ? (
        <View>
          <ProductDetails product={product} />
        </View>
      ) : (
        <View>
          <Text>Loading product...</Text>
        </View>
      )}

      <View style={{ backgroundColor: "#ffffff" }}>
        <Footer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default HomeScreen;
