import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/LoginScreen';
import Register from '../screen/RegisterScreen';
import Home from '../screen/LoginScreen';
// types/navigation.d.ts
export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} // Corrected headerShown
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }} // Corrected headerShown
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }} // Corrected headerShown
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
