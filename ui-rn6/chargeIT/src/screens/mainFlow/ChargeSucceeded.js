import { View, Text, StyleSheet } from "react-native";

const ChargeSucceeded = ({ route }) => {
    const {result} = route.params;

    return (
        <View>
            <Text>Thanks you for using {result.stationName}. Your payment is: {result.payment}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default ChargeSucceeded;
