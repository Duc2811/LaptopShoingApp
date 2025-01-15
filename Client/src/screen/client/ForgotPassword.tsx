import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { forgotPassword } from "@/src/services/client/ApiServices";
import InputBox from "@/src/components/forms/InputBox";
import SubmitButton from "@/src/components/forms/submitButton";

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    ForgotOTP: { email: string };
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "ForgotPassword">;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const ForgotPassword: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>("");

    const handleForgotPassword = async () => {
        try {
            const response = await forgotPassword(email);
            if (response.data.code === 401 || response.data.code === 500) {
                alert(response.data.message);
                console.log(response.data.message);
                return;
            }
            alert(response.data.message);
            navigation.navigate("ForgotOTP", { email });
        } catch (error) {
            console.error("Error sending forgot password email:", error);
        }
    };


    return (
        <View className="flex-1 bg-gray-100 p-6 justify-center">
            <View className="mb-8">
                <Text className="text-2xl font-bold text-center text-gray-800">Forgot Password</Text>
                <Text className="text-sm text-center text-gray-500 mt-2">
                    Enter your email to receive a password reset link.
                </Text>
            </View>
            <View className="space-y-6">
                <InputBox
                    inputTitle="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter Your Email"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    autoComplete="email"
                    style={{
                        backgroundColor: "white",
                        borderColor: "#D1D5DB",
                        borderWidth: 1,
                        borderRadius: 8,
                        padding: 16,
                    }}
                />
                <SubmitButton
                    handleSubmit={handleForgotPassword}
                    btnTitle="Submit"
                    loading={false}
                    className="bg-blue-600 py-4 rounded-md"
                />
            </View>
        </View>
    );
};

export default ForgotPassword;
