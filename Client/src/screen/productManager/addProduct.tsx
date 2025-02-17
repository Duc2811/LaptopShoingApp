import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { addProduct as AddProduct } from '@/src/services/client/ApiCategory_Product';

interface Props {
  OnSuccess?: () => void;
  onCancel?: () => void;
  SubCategoryId: string;
}

const AddProductComponent: React.FC<Props> = ({ OnSuccess, onCancel, SubCategoryId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');


  const handleSubmit = async () => {
    try {
      const productData = {
        name,
        description,
        price: Number(price),
        image,
        quantity: Number(quantity),
      };

      await AddProduct(SubCategoryId, productData);
      OnSuccess && OnSuccess();
      alert('Product added successfully');
      console.log('Product added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput style={styles.input} placeholder="Product Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Image URL" value={image} onChangeText={setImage} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
    
      <Button title="Submit" onPress={handleSubmit} />
      {onCancel && <Button title="Cancel" onPress={onCancel} color="red" />}
    </ScrollView>
  );
};

export default AddProductComponent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
