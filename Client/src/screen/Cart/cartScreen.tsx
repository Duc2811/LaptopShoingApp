import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../../store/reducer/cartReducer';
import Header from '@/src/components/menus/header';

const CartScreen = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * (item.price || 0), 0);

  return (
    <>
      <Header isCart={true} />
      <View style={styles.container}>
        <Text style={styles.title}>🛒 Your Cart</Text>

        {cartItems.length === 0 ? (
          <Text style={styles.emptyCart}>Your cart is empty 😢</Text>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.productId}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.details}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>Price: ${item.price ? Number(item.price).toFixed(2) : "0.00"}</Text>
                    <Text>Quantity: {item.quantity}</Text>

                    <View style={styles.quantityControls}>
                      <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.productId))} style={styles.button}>
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.productId))} style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <Button title="Remove" color="red" onPress={() => dispatch(removeFromCart(item.productId))} />
                  </View>
                </View>
              )}
            />


            <View style={styles.totalContainer}>
              <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
              <Button title="Checkout" onPress={() => alert('Proceed to checkout')} />
              <Button title="Clear Cart" color="red" onPress={() => dispatch(clearCart())} />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyCart: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 20,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
