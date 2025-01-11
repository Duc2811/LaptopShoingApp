import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: "https://i5.walmartimages.com/asr/3e546ff9-e1ea-458c-8ac5-671673a05fd2_1.93edbfcf20424e848d07e685a4a0e2e1.jpeg" }} 
          style={styles.image} 
        />
        <Image 
          source={{ uri: "https://th.bing.com/th/id/OIP.dhgcogyWQyBNArDLiWWOlwHaHa?rs=1&pid=ImgDetMain" }} 
          style={styles.image} 
        />
        <Image 
          source={{ uri: "https://th.bing.com/th/id/OIP.F2OfONJmoDM4DWW0FNs-1gHaE8?w=246&h=180&c=7&r=0&o=5&pid=1.7" }} 
          style={styles.image} 
        />
        <Image 
          source={{ uri: "https://s.alicdn.com/@sc04/kf/H3bb6a57e9a834cd9b68db3511cfadc97r.jpg_300x300.jpg" }} 
          style={styles.image} 
        />
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,  // Đặt chiều cao cụ thể cho ảnh
    resizeMode: 'cover',
    marginBottom: 10,  // Thêm khoảng cách giữa các ảnh
  },
});

export default HomeScreen;
