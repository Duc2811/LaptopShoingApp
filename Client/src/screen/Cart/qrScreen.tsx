import React from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Text, Button } from "react-native-paper";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/RootStackParamList";

type QrScreenRouteProp = RouteProp<RootStackParamList, "QrScreen">;

const QrScreen: React.FC<{ route: QrScreenRouteProp }> = ({ route }) => {
    const navigation = useNavigation();
    const { url } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quét mã QR để thanh toán</Text>
            <QRCode value={url} size={250} />
            <Button mode="contained" style={styles.button} onPress={() => navigation.goBack()}>
                Quay lại
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    button: {
        marginTop: 20
    },
});

export default QrScreen;
