import { View, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { addCategory as AddCategory } from '@/src/services/client/ApiCategory_Product';

interface AddCategoryFormProps {
  onSuccess?: () => void; 
  onCancel?: () => void; 
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSuccess, onCancel }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const handleSubmit = async () => {
    try {
      await AddCategory(name, description, image);
      onSuccess && onSuccess(); 
      alert('Category added successfully');
      console.log('Category added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Category Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Image URL"
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />
      <Button title="Add Category" onPress={handleSubmit} />
      {onCancel && <Button title="Cancel" color="red" onPress={onCancel} />}
    </View>
  );
};

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

export default AddCategoryForm;
