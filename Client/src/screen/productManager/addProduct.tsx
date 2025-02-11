import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { addProduct as AddProduct } from '@/src/services/client/ApiCategory_Product';
import ProductModel from '@/src/components/product/productModal';

interface Props {
  OnSuccess?: () => void
  onCancel?: () => void
  SubCategoryId: string
}
const addProduct: React.FC<Props> = ({ OnSuccess, onCancel, SubCategoryId }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [sold, setSold] = useState("")
  const [saleOf, setSaleOf] = useState("")
  const [salePrice, setSalePrice] = useState("")

  const handleSubmit = async () => {
    try {
      const product = await AddProduct(SubCategoryId,name, description, price, image, quantity, sold, saleOf, salePrice);
      OnSuccess && OnSuccess();
      alert('Product added successfully');
      console.log('Product added successfully');
    } catch (error) {
      console.error(error);
    }
    return (
      <View>
        <Text>Add Product</Text>


      </View>
    )
  }

  export default addProduct