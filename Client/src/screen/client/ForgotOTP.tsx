import React, { FormEvent, useState } from "react";
import { otp as OtpForgot } from "../../services/client/ApiServices";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import SubmitButton from '../../components/forms/submitButton'


type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    ForgotOTP: { email: string };
    ResetPassword: { token: string };
};

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, "ForgotOTP">;
type OTPScreenRouteProp = RouteProp<RootStackParamList, "ForgotOTP">;

interface Props {
    navigation: OTPScreenNavigationProp;
    route: OTPScreenRouteProp;
}
const ForgotOTP: React.FC<Props> = ({ navigation, route }) => {
    const { email } = route.params;
    const [otp, setOtp] = useState<string>("");

    const handelSendOtp = async () => {
        if (!otp) {
            return Alert.alert("Validation Error", "Please enter the OTP");
        }

        try {
            const res = await OtpForgot(otp, email);
            if (res.code === 402) {
                Alert.alert("Error", res.message);
            } else if (res.code === 200) {
                navigation.navigate("ResetPassword", { token: res.token });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            Alert.alert("Error", "Failed to verify OTP");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Verify OTP</Text>
            <Text style={styles.content}>
                Enter the OTP sent to your email address <Text style={styles.email}>{email}</Text>. Use it to reset your
                password.
            </Text>
            <TextInput
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter OTP"
                keyboardType="number-pad"
            />
            <SubmitButton
                btnTitle="Verify"
                handleSubmit={handelSendOtp}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        marginBottom: 16,
    },
    email: {
        fontWeight: "bold",
        color: "#000",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
});

export default ForgotOTP;
