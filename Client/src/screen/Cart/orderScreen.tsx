import React, { useState } from "react";
import { View, StyleSheet, ScrollView, FlatList, Image } from "react-native";
import { Text, Button, TextInput, RadioButton, Card } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, vnPay } from "../../services/client/ApiCart";
import { RootState } from "../../store/store";
import { clearCart } from "../../store/reducer/cartReducer";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/RootStackParamList";

const OrderScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const userId = useSelector((state: RootState) => state.user.user._id as string);
    const cartItems = useSelector((state: any) => state.cart.items[userId] || []);
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleOrder = async () => {
        if (!address.trim()) {
            Toast.show({ type: "error", text1: "Vui lòng nhập địa chỉ!" });
            return;
        }

        try {
            setLoading(true);
            const products = cartItems.map((item: any) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));

            const totalAmount = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
            const orderData = {
                products,
                totalAmount,
                paymentMethod: paymentMethod as "Wallet" | "COD" | "Bank Transfer",
                address,
                note,
            };

            await createOrder(orderData);
            Toast.show({ type: "success", text1: "Đặt hàng thành công!" });
            dispatch(clearCart({ userId }));

            if (paymentMethod == "Bank Transfer") {
                const response = await vnPay(totalAmount, "NCB", "vn",
                );
                if (response?.url) {
                    navigation.navigate("QrScreen", { url: response.url });
                } else {
                    throw new Error("Không lấy được URL thanh toán!");
                }
            }
        } catch (error) {
            let errorMessage = "Đã xảy ra lỗi!";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            Toast.show({ type: "error", text1: "Đặt hàng thất bại!", text2: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Đặt Hàng</Text>

            <View style={styles.row}>
                <View style={styles.leftColumn}>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.productId}
                        renderItem={({ item }) => (
                            <Card style={styles.productCard}>
                                <View style={styles.productRow}>
                                    <Image source={{ uri: item.image }} style={styles.productImage} />
                                    <View style={styles.productInfo}>
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Text>Giá: ${item.price.toFixed(2)}</Text>
                                        <Text>Số lượng: {item.quantity}</Text>
                                    </View>
                                </View>
                            </Card>
                        )}
                    />
                </View>

                <View style={styles.rightColumn}>
                    <Text style={styles.label}>Phương thức thanh toán</Text>
                    <RadioButton.Group onValueChange={(value) => setPaymentMethod(value)} value={paymentMethod}>
                        <RadioButton.Item label="Thanh toán khi nhận hàng" value="COD" />
                        <RadioButton.Item label="Chuyển khoản ngân hàng" value="Bank Transfer" />
                    </RadioButton.Group>

                    <TextInput
                        label="Địa chỉ nhận hàng"
                        mode="outlined"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
                    />

                    <TextInput
                        label="Ghi chú"
                        mode="outlined"
                        value={note}
                        onChangeText={setNote}
                        style={styles.input}
                        multiline
                    />

                    <Button mode="contained" onPress={handleOrder} loading={loading} style={styles.button}>
                        Thanh toán
                    </Button>
                </View>
            </View>

            <Toast />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    row: { flexDirection: "row", justifyContent: "space-between" },
    leftColumn: { flex: 1.2, marginRight: 10 },
    rightColumn: { flex: 1 },
    productCard: { marginBottom: 10, padding: 10 },
    productRow: { flexDirection: "row", alignItems: "center" },
    productImage: { width: 50, height: 50, marginRight: 10 },
    productInfo: { flex: 1 },
    productName: { fontSize: 16, fontWeight: "bold" },
    label: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
    input: { marginBottom: 15 },
    button: { marginTop: 10 },
});

export default OrderScreen;
