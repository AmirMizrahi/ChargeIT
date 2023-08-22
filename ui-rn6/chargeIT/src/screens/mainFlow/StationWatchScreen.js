import {Dimensions, ScrollView, StyleSheet, Text, View,ImageBackground} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import Buttons from "../../components/Buttons";
import {Context as StationsContext} from "../../context/StationsContext";
import ErrorText from "../../components/ErrorText";
import {useFocusEffect} from "@react-navigation/native";
import MapView, {Marker} from "react-native-maps";
import StationReviewCard from "../../components/StationReviewCard";
import image from "../../assets/images/app-background-new.jpg";

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
            stationDetails["Price Per Volt"] = route.params[key] + "₪";
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
            <ImageBackground source={logo3} resizeMode="cover" style={styles.image}>

            <Text style={styles.title}>Charging Station Details</Text>

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
                <View style={styles.fields}>
                    {/*Iterate on every field of the station besides reviews*/}
                    {Object.keys(stationDetails).map((key) => {
                        {
                            if (key !== "reviews") {
                                return (
                                    <View key={key}>
                                        <Text
                                            style={styles.fieldName}>
                                            {key} - {stationDetails[key]}
                                        </Text>
                                    </View>
                                )
                            }
                        }
                    })}
                    {/*Show all reviews as StationReviewCard component*/}
                    {stationDetails["reviews"] && stationDetails["reviews"].length > 0 ? (
                        <View style={styles.reviewsContainer}>
                            <Text style={styles.reviewsTitle}>Reviews:</Text>
                            {
                                stationDetails["reviews"].map((review, index) => (
                                    <View key={index} style={styles.reviewItem}>
                                        <StationReviewCard details={{
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
                    <View style={styles.mapContainer}>
                        <Buttons
                            btn_text={"Press to Charge"}
                            on_press={async () => {
                                navigation.navigate("QRScanScreen", {
                                    selectedChargingStationId: route.params["id"],
                                    currentLocation: route.params["location"],
                                });
                                // alert(`asdasdsad`);

                                // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                                // const result = await charge({
                                //     selectedChargingStationId: route.params["id"],
                                //     currentLocation: route.params["location"],
                                // });
                                // if (result.message) {
                                //     setIsCharging(true);
                                // } else {
                                //     setErrorMessage(result.error);
                                // }
                                // setTimeout(() => navigation.goBack(), 30000);    // Return to 'Charge'.
                            }}
                        />
                    </View>
                ) : null
            }

            {isCharging ? (
                <Text style={styles.isCharging}>Station is charging . . .</Text>
            ) : null}

            {errorMessage ? (
                <ErrorText errorMessage={errorMessage}/>
            ) : null}
            {/**/}
            </ImageBackground>
        </ScrollView>
    );
};
const logo3 = require('./../../assets/images/logo4.jpeg')

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingTop: 40
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
        flexDirection: 'column',
        alignItems: "center"
    },
    stationContainer: {
        borderWidth: 1,
        borderColor: "#000000",
        padding: 10,
        marginBottom: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: 300,
        textShadowColor: "gray",
        margin: 10
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
    fields: {
        flexDirection: 'column',
        flex:1,
        padding: 20
    },
    fieldName: {
        fontWeight: 400,
        fontSize: 20,
        marginLeft: 10,
        textAlign: 'center',
        marginBottom: 5
    },
    mapContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    },
    map: {
        width: Dimensions.get("window").width,
        height: 250
    },
});

export default StationWatchScreen;
