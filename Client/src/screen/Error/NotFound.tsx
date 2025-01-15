import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    NotFound: undefined;
};

type NotFoundScreenNavigationProp = StackNavigationProp<RootStackParamList, "NotFound">;

interface Props {
    navigation: NotFoundScreenNavigationProp;
}


const NotFound: React.FC<Props> = ({ navigation }) => {

    const goHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>404</Text>
            <Text style={styles.subTitle}>Sorry, the page you visited does not exist.</Text>
            <TouchableOpacity style={styles.button} onPress={goHome}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f9',
        padding: 16
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ff4d4f'
    },
    subTitle: {
        fontSize: 18,
        color: '#8c8c8c',
        marginVertical: 10
    },
    button: {
        marginTop: 20,
        backgroundColor: '#1890ff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default NotFound;
