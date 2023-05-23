import {Alert, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import basicApi from "../../api/basicApi";
import Buttons from "../../components/Buttons";

export const StationWatchScreen = ({navigation, route}) => {
    const [stationDetails, setStation] = useState({});

    Object.keys(route.params).map(key => {
        console.log(route);
        console.log(route.params);
        // if (key === 'location') {
        //     stationDetails["Location"] = "Longitude: " + route.params[key].longitude + ", Latitude: " + route.params[key].latitude
        // }
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
        <View style={styles.mainView}>
            <Text style={styles.stationName}>Charging Station Details:</Text>
            <View style={{paddingBottom: 20}}>
            {Object.keys(stationDetails).map(key => {
                return (
                    <View key={key}>
                        <Text style={key === 'stationNamecd ui' ? styles.stationName : styles.stationStatus}>
                            {key}: {stationDetails[key]}
                        </Text>
                    </View>
                );
            })}

            </View>
            <Buttons btn_text={"Charge"} on_press={async () => {
                //Alert.alert('Charging ...',null, [{text: 'OK', onPress: () => console.log('OK Pressed')}] )

                try {
                    await basicApi.put("/chargingStations/charge?chargingStationId="+route.params['id']).then(() => {
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
                        location: '1'
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
    mainView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    noStationsText: {
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "400",
    },
    container: {
        flex: 1,
        padding: 10,
    },
    stationContainer: {
        borderWidth: 1,
        borderColor: "#000000",
        padding: 10,
        marginBottom: 10,
    },
    stationName: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 15
    },
    stationLocation: {
        marginTop: 5,
        fontSize: 14,
    },
    stationStatus: {
        marginTop: 5,
        fontSize: 14,
        color: "gray",
    },
});