import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Buttons from '../../components/Buttons';
import QRCode from "react-native-qrcode-svg";

const StationCreated = ({ navigation, route }) => {
    const id  = route.params.id;

    return (
        <View>
            <View>
                <Text>
                    Thanks you for creating a sharable charging station at ChargeIt. This is your station's QR code:
                </Text>
                <QRCode value= {id} size={300}/>
                <Text>
                    Please print it and attach it next to your charging station, so users can scan it when they arrive.
                </Text>
            </View>
            <View>
                <View style={styles.buttonView}>
                    <Buttons btn_text="Return" on_press={()=> navigation.goBack()}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default StationCreated;