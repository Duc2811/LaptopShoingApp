import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import { PersistGate } from 'redux-persist/integration/react';  // Import PersistGate from redux-persist
import StackNavigator from '../src/navigations/StackNavigator'; // Import your navigator
import { store, persistor } from '../src/store/store';

export default function App() {
  return (
    <Provider store={store}>  {/* Wrap your app with Provider and pass the store */}
      <PersistGate loading={null} persistor={persistor}>  {/* Wrap with PersistGate */}
        <StackNavigator />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
