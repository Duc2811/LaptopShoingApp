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

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, "ForgotPassword">;

interface ForgotPasswordProps {
    navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>("");

    const handleForgotPassword = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
        try {
            const response = await forgotPassword(email);

            if (response.data.code === 200) {
                alert("Email sent successfully.");
                navigation.navigate("ForgotOTP", { email });
            } else {
                alert(response.data.message || "An error occurred.");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                    Enter your email to receive a password reset link.
                </Text>
            </View>
            <View style={styles.form}>
                <InputBox
                    inputTitle="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter Your Email"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    autoComplete="email"
                    style={styles.input}
                />

                <SubmitButton
                    handleSubmit={handleForgotPassword}
                    btnTitle="Submit"
                    loading={false}

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 24,
        justifyContent: "center",
    },
    header: {
        marginBottom: 32,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 8,
        textAlign: "center",
    },
    form: {
        marginBottom: 24,
    },
    input: {
        backgroundColor: "white",
        borderColor: "#D1D5DB",
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
    },
    submitButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 8,
    },
});

export default ForgotPassword;
