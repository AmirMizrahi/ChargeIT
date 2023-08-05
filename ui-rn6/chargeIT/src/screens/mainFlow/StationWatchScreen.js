import {Alert, StyleSheet, Text, View} from "react-native";
import React, {useContext, useState} from "react";
import basicApi from "../../api/basicApi";
import Buttons from "../../components/Buttons";
import {Context as StationsContext} from "../../context/StationsContext";
import ErrorText from "../../components/ErrorText";
import {useFocusEffect} from "@react-navigation/native";

const StationWatchScreen = ({navigation, route}) => {
    const [stationDetails, setStation] = useState({});
    const [isCharging, setIsCharging] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const {charge} = useContext(StationsContext);

    // Reset isCharging whenever screen is rendered.
    useFocusEffect(
        React.useCallback(() => {
            setIsCharging(false);
            setErrorMessage(null);
        }, [])
    );

    Object.keys(route.params).map((key) => {
        //console.log(route);
        console.log(route.params);
        // if (key === 'location') {
        //     stationDetails["Location"] = "Longitude: " + route.params[key].longitude + ", Latitude: " + route.params[key].latitude
        // }
        if (key === "chargerType") {
            stationDetails["Charging Type"] = route.params[key];
        } else if (key === "stationName") {
            stationDetails["Station Name"] = route.params[key];
        } else if (key === "pricePerVolt") {
            stationDetails["Price Per Volt"] = route.params[key] + "$";
        } else if (key === "status") {
            stationDetails["Status"] =
                route.params["status"] === "NOT_CHARGING"
                    ? "Available"
                    : "Not Available";
        }
    });

    return (
        <View style={styles.mainView}>
            <Text style={styles.stationName}>Charging Station Details</Text>
            <View style={{paddingBottom: 20}}>
                {Object.keys(stationDetails).map((key) => {
                    return (
                        <View key={key}>
                            <Text
                                style={
                                    key === "stationName"
                                        ? styles.stationName
                                        : styles.stationStatus
                                }
                            >
                                {key}: {stationDetails[key]}
                            </Text>
                        </View>
                    );
                })}
            </View>

            { !isCharging ?
                (
                    <Buttons
                        btn_text={"Press to Charge"}
                        on_press={async () => {
                            const result = await charge({
                                selectedChargingStationId: route.params["id"],
                                currentLocation: route.params["location"],
                            });
                            if (result.message) {
                                setIsCharging(true);
                            }
                            else {
                                setErrorMessage(result.error);
                            }
                            setTimeout(() => navigation.goBack(), 3000);    // Return to 'Charge'.
                        }}
                    />
                ) : null
            }

            {isCharging ? (
                <Text style={styles.ischarging}>Station is charging . . .</Text>
            ):null}

            {errorMessage ? (
                <ErrorText errorMessage={errorMessage}/>
            ):null}
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    ischarging: {
        fontSize: 16,
        fontStyle: "italic",
        fontWeight: "400",
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
        fontSize: 19,
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 15,
    },
    stationLocation: {
        marginTop: 5,
        fontSize: 14,
    },
    stationStatus: {
        marginTop: 5,
        fontSize: 17,
        color: "gray",
        textAlign: "center",
    },
});

export default StationWatchScreen;
