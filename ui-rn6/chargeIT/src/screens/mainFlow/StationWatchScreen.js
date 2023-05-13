import {Alert, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import basicApi from "../../api/basicApi";
import Buttons from "../../components/Buttons";

export const StationWatchScreen = ({navigation, route}) => {
    const [stationDetails, setStation] = useState({});

    Object.keys(route.params).map(key => {
        console.log(route);
        console.log(route.params);
        if (key === 'location') {
            stationDetails["Location"] = "Longitude: " + route.params[key].longitude + ", Latitude: " + route.params[key].latitude
        }
        if (key === 'chargerType') {
            stationDetails["Charging Type"] = route.params[key];
        }
        if (key === 'pricePerVolt') {
            stationDetails["Price Per Volt"] = route.params[key] + "$";
        } else if (key === 'status') {
            stationDetails["Status"] = route.params['status'] === "NOT_CHARGING" ? "Ready for use" : "Not Available";
        }
        console.log(stationDetails);
    });


    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Charging Station Details:</Text>
            {Object.keys(stationDetails).map(key => {
                return (
                    <View key={key} style={styles.smallText}>
                        <Text>
                            {key}: {stationDetails[key]}
                        </Text>
                    </View>
                );
            })}
            <Buttons btn_text={"Charge"} on_press={async () => {
                //Alert.alert('Charging ...',null, [{text: 'OK', onPress: () => console.log('OK Pressed')}] )

                try {
                    await basicApi.post("/chargingStations/charge", {
                        location: route.params['location']
                    }).then(() => {
                        Alert.alert('Charging in progress...', null, [{
                            text: 'OK',
                            onPress: () => console.log('OK Pressed')
                        }])
                    })
                } catch (err) {
                    console.log(err)

                }
            }}>
            </Buttons>

            <Buttons btn_text={"Stop"} on_press={async () => {
                try {
                    await basicApi.post("/chargingStations/unCharge", {
                        location: route.params['location']
                    }).then(() => {
                        Alert.alert('Charging session ended!', null, [{
                            text: 'OK',
                            onPress: () => console.log('OK Pressed')
                        }])
                    })
                } catch (err) {
                }
            }}>
            </Buttons>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        width: '95%',
        backgroundColor: "#465bd8",
        height: 50,
        marginBottom: 30,
        borderRadius: 10,
    },
    buttonDisabled: {
        padding: '10px 30px',
        cursor: 'not-allowed',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
        backgroundColor: '#465bd8',
        color: 'white'

    },
    mainViewTextButton: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    mainText: {
        fontSize: 30,
    },
    smallText: {
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "400",
    },
});