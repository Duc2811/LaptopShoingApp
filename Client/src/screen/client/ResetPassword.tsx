import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from "@react-navigation/stack";
import { forgotPassword, otp, resetPassword } from '@/src/services/client/ApiServices';
import InputBox from '@/src/components/forms/InputBox';
import SubmitButton from '@/src/components/forms/submitButton';
import { KeyboardAvoidingView } from 'native-base/lib/commonjs/components/basic';

type RootStackParamList = {
    Home: undefined,
    Register: undefined,
    Login: undefined,
    Verify: undefined,
    ResetPassword: undefined
}


type ResetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>
type Props = {
    navigation: ResetPasswordScreenNavigationProp;
}

const ResetPassword: React.FC<Props> = ({ navigation }) => {

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const token = navigation.getId();

    const handleReset = async () => {
        try {
            const response = await resetPassword(password, confirmPassword, token);
            if (response.data.code === 200) {
                alert('Password reset successfully')
                navigation.navigate('Login')
            }
            else if (response.data.code === 400) {
                alert(response.data.message)
            }
        } catch (error) {
            alert('An error occurred. Please try again.')
        }
    }

    return (
        <View>
            <KeyboardAvoidingView behavior="position" >
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
            </KeyboardAvoidingView>
        </View>
    )
}

export default ResetPassword;