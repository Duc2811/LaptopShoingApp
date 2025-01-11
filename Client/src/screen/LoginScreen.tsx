import React, { useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { userLogin } from "../services/client/ApiServices";
import { doLogin } from "../store/reducer/userReducer";
import { useDispatch } from "react-redux";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;

};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;
interface Props {
  navigation: LoginScreenNavigationProp;
}
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      const res = await userLogin(email.trim(), password.trim());
      if (res.code === 402) {
        alert(res.message);
      } else if (res.code === 200) {
        alert(res.message);
        dispatch(doLogin({
          _id: res.id,
          token: res.token,
          notification: res.notification,
        }));
        navigation.navigate("Home");
      } else {
        alert("Unexpected response code: " + res.code);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10, alignItems: "center" }}>
      <KeyboardAvoidingView behavior="padding">
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
            secureTextEntry={!showPassword}
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor={"black"}
          />
          <Pressable onPress={handlePasswordToggle}>
            <Text style={styles.toggleText}>
              {showPassword ? "Hide Password" : "Show Password"}
            </Text>
          </Pressable>
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
    width: "100%",
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
  toggleText: {
    marginTop: 5,
    color: "blue",
    fontSize: 16,
  },
});

export default LoginScreen;
