import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import Buttons from "../../components/Buttons";
import {Context as StationsContext} from "../../context/StationsContext";
import ErrorText from "../../components/ErrorText";
import {useFocusEffect} from "@react-navigation/native";
import MapView, {Marker} from "react-native-maps";
import stationReview from "../../components/StationReview";
import StationReview from "../../components/StationReview";

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
        console.log(route.params);

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
        } else if (key === "reviews") {
            stationDetails["reviews"] = route.params[key];
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
        <ScrollView style={styles.mainView}>
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
                    {/*Iterate on every field of the station besides reviews*/}
                    {Object.keys(stationDetails).map((key) => {
                        {
                            if (key !== "reviews") {
                                return (
                                    <View key={key}>
                                        <Text
                                            style={key === "Station Name" ? styles.stationName : styles.stationStatus}>
                                            {key}: {stationDetails[key]}
                                        </Text>
                                    </View>
                                )
                            }
                        }
                    })}
                    {/*Show all reviews as StationReview component*/}
                    {stationDetails["reviews"] && stationDetails["reviews"].length > 0 ? (
                        <View style={styles.reviewsContainer}>
                            <Text style={styles.reviewsTitle}>Reviews:</Text>
                            {
                                stationDetails["reviews"].map((review, index) => (
                                    <View key={index} style={styles.reviewItem}>
                                        <StationReview details={{
                                            name: review.nickname,
                                            grade: review.grade,
                                            text: review.reviewText,
                                            dateTime: review.dateTime
                                        }}/>
                                    </View>
                                ))}
                        </View>
                    ) : null}
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
                <Text style={styles.isCharging}>Station is charging . . .</Text>
            ) : null}

            {errorMessage ? (
                <ErrorText errorMessage={errorMessage}/>
            ) : null}
            {/**/}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    isCharging: {
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
