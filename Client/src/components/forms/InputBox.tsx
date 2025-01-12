import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

interface InputBoxProps {
  inputTitle: string;
  autoComplete?: "email" | "username" | "password" | "off";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string; 
  placeholderTextColor?: string;
  style?: object; 
}

const InputBox: React.FC<InputBoxProps> = ({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  style,
}) => {
  return (
    <View>
      <Text>{inputTitle}</Text>
      <TextInput
        style={[styles.inputBox, style]} 
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText} 
        placeholder={placeholder} 
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
});

export default InputBox;
