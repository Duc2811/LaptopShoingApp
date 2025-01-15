import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { userRegister as Register } from '../../services/client/ApiServices';
import InputBox from '../../components/forms/InputBox';
import SubmitButton from '../../components/forms/submitButton';
import { validateRegistration } from '@/src/modal/ResgisterValidate';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Verify: { email: string };
};

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegistrationScreenNavigationProp;
}

const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleRegisterUser = async () => {
    validateRegistration(userName, email, password, confirmPassword, phone, address);
    if (!validateRegistration(userName, email, password, confirmPassword, phone, address).valid) {
      alert(validateRegistration(userName, email, password, confirmPassword, phone, address).message);
      return;
    }
    try {
      const response = await Register(userName, email, password, phone, address);
      if (response?.code === 402 || response?.code === 409 || response?.code === 509) {
        alert(`Error ${response?.code}: ${response?.message}`);
        return;
      }
      else {
        alert("Registration Successful");
        navigation.navigate('Verify', { email });
      }
    } catch (error: any) {
      alert("An error occurred during registration.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <InputBox
        inputTitle="Name"
        placeholder="Enter your name"
        value={userName}
        onChangeText={setuserName}
        style={styles.input}
      />
      <InputBox
        inputTitle="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <InputBox
        inputTitle="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <InputBox
        inputTitle="Confirm Password"
        placeholder="Re-enter your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <InputBox
        inputTitle="Phone"
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <InputBox
        inputTitle="Address"
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <SubmitButton handleSubmit={handleRegisterUser} btnTitle="Register" />
      <SubmitButton handleSubmit={() => navigation.navigate("Login")} btnTitle="Already have an account? Sign in" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default RegistrationScreen;
