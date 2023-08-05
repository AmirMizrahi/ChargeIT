import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorText = ({ errorMessage }) => {
    return (
        <View>
        {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: "red",
        marginLeft: 15,
        marginTop: 15,
    }
});

export default ErrorText;
