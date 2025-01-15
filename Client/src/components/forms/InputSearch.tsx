import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface InputSearchProps {
    onSearch: (query: { productName?: string; description?: string }) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        onSearch({
            productName: inputValue,
            description: inputValue
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                placeholder="Search Google or type a URL"
                value={inputValue}
                onChangeText={setInputValue}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    inputBox: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25
    },
    searchText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default InputSearch;
