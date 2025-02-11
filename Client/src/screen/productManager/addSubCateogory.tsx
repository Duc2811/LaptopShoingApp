import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { addSubCategory as AddSubCategory } from '@/src/services/client/ApiCategory_Product';

interface AddSubCategoryFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  categoryId: string
}
const addSubCateogory: React.FC<AddSubCategoryFormProps> = ({ onSuccess, onCancel, categoryId }) => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = async () => {
    try {
      await AddSubCategory(categoryId, name, description, image);
      onSuccess && onSuccess();
      alert('SubCategory added successfully');
      console.log('SubCategory added successfully');
    } catch (error) {
      console.error(error);
    }
  }

  return (

    <View style={styles.container}>
      <Text> Add SubCategory with Category Id: {categoryId}</Text>
      <TextInput
        placeholder="SubCategory Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="SubCategory Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="SubCategory Image or Image URL"
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />
      <Button title="Add Category" onPress={handleSubmit} />
      {onCancel && <Button title="Cancel" color="red" onPress={onCancel} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
export default addSubCateogory