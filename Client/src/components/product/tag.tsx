import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TagItem = {
  id: number;
  name: string;
};

const Tags: React.FC = () => {
  const [selected, setSelected] = useState<string>("Trending Laptops");

  const tags: TagItem[] = [
    { id: 1, name: "Trending Laptops" },
    { id: 2, name: "All Laptops" },
    { id: 3, name: "New Arrivals" },
    { id: 4, name: "Gaming Laptops" },
    { id: 5, name: "Business Laptops" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tags}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item.name)}>
            <Text
              style={[
                styles.tagText,
                item.name === selected ? styles.isSelected : null,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tagText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#F0F0F0",
    color: "#7D7D7D",
    fontWeight: "700",
  },
  isSelected: {
    backgroundColor: "#2B6EF7",
    color: "#FFFFFF",
  },
  container: {
    marginVertical: 15,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});
