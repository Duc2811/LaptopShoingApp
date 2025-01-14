import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from "@react-navigation/stack";
import OTPInput from '@/src/components/forms/OtpInput';
import { verifyEmail } from '@/src/services/client/ApiServices';


type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    Verify: undefined;
}

type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, "Verify">;

interface Props {
    navigation: VerifyScreenNavigationProp
}

const VerifyScreen: React.FC<Props> = ({ navigation }) => {
    const [otp, setOtp] = useState<string>('');
    const [userID, setUserID] = useState<string>('');

    const handleVerify = async () => {
        try {
            const response = await verifyEmail(otp, userID);
            if (response.code === 400) {
                alert(response.message);
            }
            else if (response.code === 500) {
                alert(response.message);
            }
            else if (response.code === 201) {
                alert(response.message);
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Error verifying email:', error);
        }
    }


    return (
        <View style={styles.container}>
            <Text>Verify Screen</Text>
            <OTPInput />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    }

})


export default VerifyScreen