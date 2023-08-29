import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Buttons from '../../components/Buttons';
import QRCode from "react-native-qrcode-svg";

const StationCreated = ({navigation, route}) => {
    const id = route.params.id;

    return (
        <View style={styles.mainView}>
            <Text style={styles.headerText}>
                Thank you for creating a sharable charging station at ChargeIt.
                This is your station's QR code:
            </Text>
            <View  style={{alignItems: 'center', margin: 40}}>
                <QRCode value={id} size={300}/>

            </View>
            <Text style={styles.smallText}>
                Please print it and attach it next to your charging station, so users can scan it when they arrive.
            </Text>
            <View style={{alignItems: 'center'}}>
                <Buttons btn_text="Return" on_press={() => navigation.goBack()}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",

    },
    headerText: {
        fontSize: 25,
        fontWeight: "300",
        textAlign: 'center',
        top: 40
    },
    buttons: {
        bottom: -200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    smallText: {
        fontSize: 18,
        fontWeight: "300",
        textAlign: 'center',
    },
    picker: {
        fontSize: 14,
        justifyContent: "center",
        flex: 1,
        height: 20,
        backgroundColor: 'red'
    },
    input: {
        width: "40%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: 'pink'
    },
    lineTextAndInput: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        maxWidth: Dimensions.get('window').width - 100,
        alignItems: 'center'
    },
    label: {
        fontSize: 18,
        fontWeight: 300
    },
});

export default StationCreated;