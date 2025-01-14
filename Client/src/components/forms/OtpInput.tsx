import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

type OTPInputProps = {
    length?: number;
    onCodeFilled?: (code: string) => void;
};

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onCodeFilled }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = (text: string, index: number) => {
        if (text.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }
        if (newOtp.every((char) => char !== '')) {
            onCodeFilled && onCodeFilled(newOtp.join(''));
        }
    };

    const handleKeyPress = (
        event: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        const { key } = event.nativeEvent;
        if (key === 'Backspace' && otp[index] === '' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((value, index) => (
                <TextInput
                    key={index}
                    value={value}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    ref={(ref) => (inputs.current[index] = ref)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.input}
                    autoFocus={index === 0}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        color: '#333',
    },
});

export default OTPInput;