import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import Category from "./categoryModal";
import SubCategory from "./subCategoryModal";
import ProductByCategory from "../../screen/productManager/productByCategory";

const width = Dimensions.get("window").width;

type CategoryCardProps = {
  item: Category;
  handleCategoryClick: (item: Category | SubCategory) => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ item, handleCategoryClick }) => {
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleShowSubCategories = () => {
    setShowSubCategories((prev) => !prev);
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
    setModalVisible(true);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleCategoryClick(item)}>
        <Image style={styles.cardImage} source={{ uri: item.image }} />
        <Text style={styles.cardTitle}>{item.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleShowSubCategories} style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>
          {showSubCategories ? "Show Less" : "Show More"}
        </Text>
      </TouchableOpacity>

      {showSubCategories && (
        <View style={styles.subCategoriesContainer}>
          {item.subCategories.map((subCategory: SubCategory) => (
            <TouchableOpacity
              key={subCategory.id}
              onPress={() => handleSubCategoryClick(subCategory.id)}
              style={styles.subCategoryCard}
            >
              <Image style={styles.subCategoryImage} source={{ uri: subCategory.image }} />
              <Text style={styles.subCategoryName} numberOfLines={1}>
                {subCategory.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {selectedSubCategoryId && <ProductByCategory id={selectedSubCategoryId} />}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: "30%",
    height: 70,
    borderRadius: 8,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
    color: "#333",
  },
  showMoreButton: {
    alignItems: "center",
    marginVertical: 8,
  },
  showMoreText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
  subCategoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  subCategoryCard: {
    width: "30%",
    alignItems: "center",
    marginVertical: 10,
  },
  subCategoryImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    resizeMode: "cover",
  },
  subCategoryName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
});

export default CategoryCard;
