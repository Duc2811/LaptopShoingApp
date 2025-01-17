import React, { useState } from "react";
import { otp as OtpForgot } from "../../services/client/ApiServices";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import SubmitButton from '../../components/forms/submitButton';
import OTPInput from '@/src/components/forms/OtpInput';

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    ForgotPassword: undefined;
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
    const { email: userEmail } = route.params;
    const [otpCode, setOtpCode] = useState<string>("");

    const handleOtpCodeFilled = (code: string) => {
        setOtpCode(code);
    };

    const handleVerifyOtp = async () => {
        try {
            if (!otpCode) {
                return alert("Please enter the OTP");
            }
            const response = await OtpForgot(otpCode, userEmail);
            if (response.code === 400 || response.code === 401) {
                alert(response.message);
                return;
            }

            navigation.navigate("ResetPassword", { token: response.token });
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Failed to verify OTP");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Forgot Password OTP</Text>
            <Text style={styles.content}>
                Enter the OTP sent to your email address <Text style={styles.email}>{userEmail}</Text>. Use it to reset your
                password.
            </Text>
            <View>
                <OTPInput onCodeFilled={handleOtpCodeFilled} />
            </View>
            <View style={styles.buttonContainer}>
                <SubmitButton
                    btnTitle="Verify"
                    handleSubmit={handleVerifyOtp}
                />
            </View>
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
    buttonContainer: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }
});

export default ForgotOTP;