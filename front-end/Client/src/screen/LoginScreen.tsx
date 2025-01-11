import React, { useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { userLogin } from "../services/client/ApiServices";
import { doLogin } from "../store/reducer/userReducer";
import { useDispatch } from "react-redux";

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response: any = await userLogin(email.trim(), password.trim()); // Define the response type
      if (response && response.data && response.data.code === 402) {
        alert("Sai tài khoản hoặc mật khẩu");
        return;
      } else {
        dispatch(doLogin({
          _id: response.data._id,
          token: response.data.token,
          notification: 0
        }));
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10, alignItems: "center" }}>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 100, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "600" }}>Login Screen</Text>
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Don't have an account? Sign up
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor={"black"}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor={"black"}
          />
        </View>

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderBottomColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    width: 200,
    backgroundColor: "#4A55A2",
    padding: 15,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
