import {Dimensions, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import Buttons from "../../components/Buttons";
import {Context as StationsContext} from "../../context/StationsContext";
import ErrorText from "../../components/ErrorText";
import {useFocusEffect} from "@react-navigation/native";
import MapView, {Marker} from "react-native-maps";

const StationWatchScreen = ({navigation, route}) => {
    const [initialRegion, setInitialRegion] = useState({});
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

    // Update initialRegion whenever route.params.location changes
    useEffect(() => {
        setInitialRegion({
            latitude: route.params.location.latitude,
            longitude: route.params.location.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        });
    }, [route.params.location]);

    return (
        <View style={styles.mainView}>
            {/*Map*/}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    region={initialRegion}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    rotateEnabled={false}>
                    <Marker coordinate={{
                        latitude: route.params.location.latitude,
                        longitude: route.params.location.longitude
                    }}/>
                </MapView>
            </View>
            {/**/}
            {/*Station Details*/}
            <View style={styles.container}>
                <Text style={styles.stationName}>Charging Station Details</Text>
                <View>
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
            </View>
            {/**/}
            {/*Buttons and text*/}
                {!isCharging ?
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
                                } else {
                                    setErrorMessage(result.error);
                                }
                                setTimeout(() => navigation.goBack(), 3000);    // Return to 'Charge'.
                            }}
                        />
                    ) : null
                }

                {isCharging ? (
                    <Text style={styles.ischarging}>Station is charging . . .</Text>
                ) : null}

                {errorMessage ? (
                    <ErrorText errorMessage={errorMessage}/>
                ) : null}
                {/**/}
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
        borderColor: "red",
        borderWidth: 3,
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
    mapContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: 250
    },
});

export default StationWatchScreen;
