import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { userLogin } from "../../services/client/ApiServices";
import { doLogin } from "../../store/reducer/userReducer";
import { useDispatch } from "react-redux";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/forms/submitButton";
import button from "native-base/lib/module/theme/components/button";
import pressable from "native-base/lib/module/theme/components/pressable";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Verify: undefined;
  ForgotPassword: undefined;
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
        console.log(res.message);
      } else if (res.code === 200) {
        alert(res.message);
        dispatch(
          doLogin({
            _id: res.id,
            token: res.token,
            notification: res.notification,
          })
        );
        navigation.replace("Home");
      } else if (res.code === 606) {
        alert(res.message);
        navigation.replace("Verify");
      }
      else {
        alert("Unexpected response code: " + res.code);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex-1 bg-white p-4 items-center" style={style.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{ marginTop: 100, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Login to your account
          </Text>
        </View>

        <View className="mt-12 w-full">
          <InputBox
            inputTitle="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Your Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            autoComplete="email"
          />

        </View>

        <View className="mt-4 w-full">
          <InputBox
            inputTitle="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Enter Your Password"
            placeholderTextColor="black"
          />
          <Pressable onPress={handlePasswordToggle} className="mt-2">
            <Text className="text-blue-500 text-base">
              {showPassword ? "Hide Password" : "Show Password"}
            </Text>
          </Pressable>
        </View>

        <SubmitButton
          handleSubmit={handleLogin}
          btnTitle="Login"
          loading={false}
          className="mt-12"
        />

        <Pressable onPress={() => navigation.navigate("Register")} className="mt-4" style={style.pressable}>
          <Text className="text-center text-gray-500 text-base">
            Don&apos;t have an account? Sign up
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ForgotPassword")} className="mt-4" style={style.pressable}>
          <Text className="text-center text-gray-500 text-base">
            Forgot Password ?
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default LoginScreen;
