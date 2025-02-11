import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, RefreshControl, TextInput } from "react-native";
import Footer from "../../components/menus/footer";
import Banner from "../../components/banner/banner";
import ProductCard from "@/src/components/product/productCard";
import Tags from "@/src/components/product/tag";
import ProductModel from "@/src/components/product/productModal";
import CategoryModel from "@/src/components/category/categoryModal";
import SubCategoryModel from "@/src/components/category/subCategoryModal";
import Header from "@/src/components/menus/header";



import { getAllProduct as AllProduct } from "@/src/services/client/ApiCategory_Product";
import { getAllCategory as AllCategory } from "@/src/services/client/ApiCategory_Product";

import CategoryCard from "@/src/components/category/categoryCard";


const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async (page: number) => {
    try {
      const response = await AllProduct(page);
      return response?.products || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await AllCategory();
      return response?.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const productData = await fetchProducts(1);
      const categoryData = await fetchCategories();
      setProducts(productData);
      setCategories(categoryData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const productData = await fetchProducts(1);
        const categoryData = await fetchCategories();
        setProducts(productData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    initializeData();
  }, []);

  const handleProductDetails = (item: ProductModel) => {
    console.log("Navigate to product details for:", item);
  };

  const handleCategoryDetails = (item: CategoryModel | SubCategoryModel) => {
    console.log("Navigate to category or subcategory details for:", item);
  };



  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View>
        <Header isCart={true} />
      </View>
      <View>
        <Banner />
      </View>

      <View style={styles.container}>
        <Text style={styles.headingText}>Match Your Style</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.searchIcon} />
          <TextInput placeholder="Search" style={styles.textInput} />
        </View>
        <Tags />

        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.headingText}>Product Manager Screen</Text>
          <View style={styles.listContainer}>
            <Text style={styles.sectionTitle}>Categories</Text>
            {categories.length > 0 ? (
              <View style={styles.categoryList}>
                {categories.map((item) => (
                  <CategoryCard
                    key={item._id}
                    item={item}
                    handleCategoryClick={handleCategoryDetails}
                  />
                ))}
              </View>
            ) : (
              <Text>No categories found.</Text>
            )}
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.sectionTitle}>Products</Text>
            {products.length > 0 ? (
              <View style={styles.productList}>
                {products.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    handleProductClick={handleProductDetails}
                  />
                ))}
              </View>
            ) : (
              <Text>No products found.</Text>
            )}
          </View>
        </ScrollView>

      </View>
      <Footer />
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
  listContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
 
});

export default HomeScreen;
