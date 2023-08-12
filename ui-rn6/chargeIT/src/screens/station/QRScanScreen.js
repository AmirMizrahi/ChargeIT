import React, {useState, useEffect, useContext} from 'react';
import {Text, StyleSheet, Button, View, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import {Context as StationsContext} from "../../context/StationsContext";

function QRScanScreen({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const {charge} = useContext(StationsContext);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({type, data}) => {
        let title = "Charging request failed!", message;
        setIsActive(true);

        if (data !== route.params["selectedChargingStationId"]){
            message = "QR Code don't match the one at the station. Ary you sure your in the right place?";
        }

        else {
            const result = await charge({
                selectedChargingStationId: route.params["selectedChargingStationId"],
                currentLocation: route.params["currentLocation"],
            });

            if (result.message) {
                title = "Charging started!";
                message = "Don't forget to discharge when you've finished.";
            } else {
                message = result.error;
            }
        }

        Alert.alert(title, message, [
            {text: "OK"},
        ]);
        navigation.navigate("Charge");
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {!isActive && (
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={{ paddingBottom: 100, flexGrow: 1 }}
                />
            )}
            {/*<Button title="open scanner" onPress={() => setIsActive(true)} />*/}
            {/*<Button title="close scanner" onPress={() => setIsActive(false)} />*/}
            <Button title="Toggle barcode scanner" onPress={() => setIsActive((value) => !value)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
});

export default QRScanScreen;