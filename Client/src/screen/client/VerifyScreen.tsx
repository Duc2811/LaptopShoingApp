import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from "@react-navigation/stack";
import OTPInput from '@/src/components/forms/OtpInput';
import { verifyEmail } from '@/src/services/client/ApiServices';
import SubmitButton from '@/src/components/forms/submitButton';
import { RouteProp } from '@react-navigation/native';


type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    Verify: { email: string };
}

type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, "Verify">;
type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>;

interface Props {
    navigation: VerifyScreenNavigationProp;
    route: VerifyScreenRouteProp;
}


const VerifyScreen: React.FC<Props> = ({ navigation, route }) => {
    const { email } = route.params;
    const [otp, setOtp] = useState<string>('');

    const handleVerify = async () => {
        try {

            if (!otp) {
                alert("Please enter the OTP.");
                return;
            }
            const response = await verifyEmail(otp, email);
            if (response.code === 401 || response.code === 500) {
                alert(response.message);
                console.log(response.message);
            } else {
                alert('Verification successful');
                navigation.navigate('Login');
            }
        } catch (error) {
            alert('An error occurred during verification.');
            console.log(error);
        }

    };



    const handleCodeFilled = (code: string) => {
        setOtp(code);
    }

    return (
        <View style={styles.container}>
            <Text>Verify Screen</Text>
            <Text>Enter OTP</Text>
            <OTPInput onCodeFilled={handleCodeFilled}
            />
            <View style={styles.buttonZ}>
                <SubmitButton
                    btnTitle="Verify"
                    handleSubmit={handleVerify}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    buttonZ: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }
})


export default VerifyScreen