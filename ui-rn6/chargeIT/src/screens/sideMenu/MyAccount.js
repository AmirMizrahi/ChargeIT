// MyAccount.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MyAccount = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>mmm</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
    },
    menuItem: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default MyAccount;