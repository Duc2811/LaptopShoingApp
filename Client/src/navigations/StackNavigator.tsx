import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/client/LoginScreen';
import Register from '../screen/client/RegisterScreen';
import Home from '../screen/product/HomeScreen';
import Verify from '../screen/client/VerifyScreen';
import ForgotPassword from '../screen/client/ForgotPassword';
import ForgotOTP from '../screen/client/ForgotOTP';
import ResetPassword from '../screen/client/ResetPassword';


export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Verify: { email: string };
  ForgotPassword: undefined;
  ForgotOTP: { email: string };
  ResetPassword: { token: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ForgotOTP"
        component={ForgotOTP}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
