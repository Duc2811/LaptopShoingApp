import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <StatusBar />
            <View>{children}</View>
            <View style={styles.footer}>
                <Footer />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    footer: {
        display: "flex",
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
        zIndex: 100,
        borderTopWidth: 1,
        borderColor: "lightgray",
        position: "absolute",
        bottom: 0,
        padding: 10,
    },
});

export default Layout;