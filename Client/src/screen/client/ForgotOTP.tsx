import React, { FormEvent, useState } from "react";
import { otp as OtpForgot } from "../../services/client/ApiServices";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import SubmitButton from '../../components/forms/submitButton'
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
    const { email } = route.params;
    const [otp, setOtp] = useState<string>("");

    const handleCodeFilled = (code: string) => {
        setOtp(code);
    }

    const handelSendOtp = async () => {
        if (!otp) {
            return alert("Please enter the OTP");
        }

        try {
            const res = await OtpForgot(otp, email);
            console.log(res.message);
            // if (res.code === 400 || res.code === 401) {
            //     alert("Error", res.message);
            //     console.log(res.message);
            // }

            // navigation.navigate("ResetPassword", { token: res.token });
            // console.log(res.message);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Failed to verify OTP");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Forgot Password OTP</Text>
            <Text style={styles.content}>
                Enter the OTP sent to your email address <Text style={styles.email}>{email}</Text>. Use it to reset your
                password.
            </Text>
            <View>
                <OTPInput onCodeFilled={handleCodeFilled} />
            </View>
            <View style={styles.buttonZ}>
                <SubmitButton
                    btnTitle="Verify"
                    handleSubmit={handelSendOtp}
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
    buttonZ: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }

});

export default ForgotOTP;
