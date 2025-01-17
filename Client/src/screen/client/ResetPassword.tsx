import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from "@react-navigation/stack";
import { forgotPassword, otp, resetPassword } from '@/src/services/client/ApiServices';
import InputBox from '@/src/components/forms/InputBox';
import SubmitButton from '@/src/components/forms/submitButton';
import { KeyboardAvoidingView } from 'native-base/lib/commonjs/components/basic';
import { RouteProp } from "@react-navigation/native";


type RootStackParamList = {
    Home: undefined,
    Register: undefined,
    Login: undefined,
    Verify: undefined,
    ResetPassword: { token: string }
}

type ResetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, "ResetPassword">;
type ResetPasswordScreenRouteProp = RouteProp<RootStackParamList, "ResetPassword">;

interface Props {
    navigation: ResetPasswordScreenNavigationProp;
    route: ResetPasswordScreenRouteProp;
}
const ResetPassword: React.FC<Props> = ({ navigation, route }) => {
    const { token } = route.params;
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleReset = async () => {

        console.log(token);

        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }
        try {
            const response = await resetPassword(password, confirmPassword, token);
            console.log(response)
            if (response.code === 400 || response.code === 401) {
                alert(response.message);
            } else {
                alert('Password reset successfully')
                navigation.navigate('Login')
            }

        } catch (error) {
            alert('An error occurred. Please try again.')
        }
    }


    return (
        <View>
            <Text>ResetPassword</Text>
            <InputBox
                inputTitle="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Your Password"
                placeholderTextColor="black"
                autoComplete="password"
            />
            <InputBox
                inputTitle="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter Your Confirm Password"
                placeholderTextColor="black"
                autoComplete="password"
            />
            <SubmitButton
                handleSubmit={handleReset}
                btnTitle="Reset Password"
                loading={false}
                className='mt-12'
            />
        </View>
    )
}

export default ResetPassword;