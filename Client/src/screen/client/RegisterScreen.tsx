import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { userRegister } from '../../services/client/ApiServices';
import InputBox from '../../components/forms/InputBox';
import SubmitButton from '../../components/forms/submitButton';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
};

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegistrationScreenNavigationProp;
}

const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const registerUser = async () => {
    if (!name || !email || !password) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);

    try {
      const response: any = await userRegister(name, email, password, phone, address);
      if (response && response.data.code === 200) {
        Alert.alert("Registration Successful");
        navigation.navigate('Login');
      } else {
        Alert.alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("An error occurred during registration.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <InputBox
        inputTitle="Name" 
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <InputBox
        inputTitle="Email" 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <InputBox
        inputTitle="Password" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <InputBox
        inputTitle="Confirm Password" 
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <InputBox
        inputTitle="Phone Number" 
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <InputBox
        inputTitle="Address" 
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <SubmitButton handleSubmit={registerUser} btnTitle="Register" />
      <SubmitButton handleSubmit={() => navigation.navigate("Login")} btnTitle="Already have an account? Sign in" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default RegistrationScreen;
