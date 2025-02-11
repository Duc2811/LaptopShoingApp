import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  RefreshControl,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { getAllProduct as AllProduct } from "@/src/services/client/ApiCategory_Product";
import { getAllCategory as AllCategory } from "@/src/services/client/ApiCategory_Product";
import ProductModel from "@/src/components/product/productModal";
import SubCategoryModel from "@/src/components/category/subCategoryModal";
import CategoryModel from "@/src/components/category/categoryModal";
import CategoryCard from "@/src/components/category/categoryCard";
import ProductCard from "@/src/components/product/productCard";
import AddCategoryForm from "./addCategory";
import ProductByCategory from "./productByCategory";
import AddSubCategoryForm from "./addSubCateogory";

const ProductManagerScreen: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);
  const [addSubCategoryModalVisible, setAddSubCategoryModalVisible] = useState(false);
  const [productListModalVisible, setProductListModalVisible] = useState(false);

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

  return (
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
              <View key={item._id} style={styles.categoryItem}>
                <CategoryCard
                  item={item}
                  handleCategoryClick={() => setSelectedCategoryId(item._id)}
                />
                {selectedCategoryId === item._id && (
                  <TouchableOpacity
                    style={styles.addSubCategoryButton}
                    onPress={() => setAddSubCategoryModalVisible(true)}
                  >
                    <Text style={styles.addSubCategoryButtonText}>Add SubCategory</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ) : (
          <Text>No categories found.</Text>
        )}
      </View>

      <Button title="Add New Category" onPress={() => setModalVisible(true)} />

  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <AddCategoryForm
            onSuccess={() => {
              setModalVisible(false);
              onRefresh();
            }}
            onCancel={() => setModalVisible(false)}
          />
        </View>
      </Modal>


      <Modal visible={addSubCategoryModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <AddSubCategoryForm
            onSuccess={() => {
              setAddSubCategoryModalVisible(false);
              onRefresh();
            }}
            onCancel={() => setAddSubCategoryModalVisible(false)}
            categoryId={selectedCategoryId || ""}
          />
        </View>
      </Modal>



      {selectedCategoryId && <ProductByCategory id={selectedCategoryId} />}
      <Modal visible={productListModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          {selectedSubCategoryId && <ProductByCategory id={selectedSubCategoryId} />}
          <Button title="Close" onPress={() => setProductListModalVisible(false)} />
        </View>
      </Modal>


      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Products</Text>
        {products.length > 0 ? (
          <View style={styles.productList}>
            {products.map((item) => (
              <ProductCard
                key={item._id}
                item={item}
                handleProductClick={() => alert("Navigate to product details for:" + item._id)}
              />
            ))}
          </View>
        ) : (
          <Text>No products found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
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
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  categoryItem: {
    alignItems: "center",
  },
  addSubCategoryButton: {
    width: "100%",
    marginTop: 5,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addSubCategoryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductManagerScreen;
