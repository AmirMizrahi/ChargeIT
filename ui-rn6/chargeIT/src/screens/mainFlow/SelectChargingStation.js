import React, {useEffect, useContext, useState} from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    ImageBackground
} from "react-native";
import Spacer from "../../components/Spacer";
import Map from "../../components/Map";
import {useIsFocused} from "@react-navigation/native";
import {Context as StationsContext} from "../../context/StationsContext";
import trackMyLocation from "../../hooks/trackMyLocation";
import * as Location from "expo-location";
import {StationDetails} from "../../components/StationDetails";
import Buttons from "../../components/Buttons";

const SelectChargingStation = ({navigation}) => {
    const {
        discharge,
        getCurrentLocation,
        fetchChargingStationsByDistance,
        getStationToDischarge
    } = useContext(StationsContext);
    const [err] = trackMyLocation(useIsFocused(), getCurrentLocation);
    const [stationsList, setStations] = useState([]);
    const [selectedChargingStationId, setSelectedChargingStationId] = useState()
    const [selectedChargingStationName, setSelectedChargingStationName] = useState()
    const [currentLocation, setCurrentLocation] = useState()
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchStationsOnLoad = async () => {
            try {
                let location = await Location.getCurrentPositionAsync({});
                let newLocation = {
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                };
                setCurrentLocation(newLocation)

                let stations = {};
                const arrayOfStations = await fetchChargingStationsByDistance(
                    newLocation
                );

                const jsonArray = arrayOfStations.map((obj) => {
                    let sta = JSON.parse(Object.values(obj)[0]);
                    return {...sta, distance: Object.keys(obj)[0]};
                });

                setStations(jsonArray);

            } catch (error) {
                console.error(error);
            }
        };

        // Check if needed to show discharge button:
        // Check if there is a station which the current user is connected to, and if so => get its id.
        // If station is available, show a discharge button.
        const isDischargeButtonAvailable = async () => {
            try {
                const dischargedStation = await getStationToDischarge();
                if (dischargedStation && dischargedStation.data && dischargedStation.data.id) {
                    setSelectedChargingStationId(dischargedStation.data.id);
                    setSelectedChargingStationName(dischargedStation.data.name);
                } else {
                    setSelectedChargingStationId(null);
                    setSelectedChargingStationName(null);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchStationsOnLoad();
        isDischargeButtonAvailable();
    }, [isFocused, selectedChargingStationId]);

    const navigateToStationWatchScreen = (station) => {
         if (selectedChargingStationId) {
            Alert.alert("Your already charging your vehicle", "Discharge from " + selectedChargingStationName + " first.", [
                {text: "OK", onPress: () => console.log("OK Pressed")},
            ]);
        }
        else if (station.status === "CHARGING") {
            Alert.alert("Station is NOT available!", null, [
                {text: "OK", onPress: () => console.log("OK Pressed")},
            ]);
        }
        else if (selectedChargingStationId) {
            Alert.alert("Your already charging your vehicle", "Discharge from " + selectedChargingStationName + " first.", [
                {text: "OK", onPress: () => console.log("OK Pressed")},
            ]);
        }
        else {
            navigation.navigate("StationWatchScreen", station);
        }
    };

    const dischargeActions = async () => {
        const result = await discharge({
            selectedChargingStationId,
            currentLocation,
        });

        console.log('Result from discharge:', result);

        // Error received from server
        if (result.error) {
            Alert.alert("Something went wrong", result.error, [
                {
                    text: "OK"
                },
            ]);
        } else {
            setSelectedChargingStationName(null);
            navigation.navigate("AddReview", {navigation, result});
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={logo3} resizeMode="cover" style={styles.image}>
            <Text style={styles.stationTitle}>Stations Around You:</Text>

            <View style={styles.mapContainer}>
                <Map/>
                {err ? (
                    <Text style={styles.errMsg}> Please enable location services</Text>
                ) : null}
            </View>
            <Spacer/>
            <View style={styles.mainView}>

                {/*Discharge button*/}
                {
                    selectedChargingStationName ?
                        <Buttons
                            btn_text={"Discharge from " + selectedChargingStationName}
                            on_press={dischargeActions}/>
                        : null
                }

                <ScrollView contentContainerStyle={styles.stationListContainer}>
                    {stationsList.map((station) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={station.id}
                                onPress={() => navigateToStationWatchScreen(station)}
                            >
                                <View>
                                    <StationDetails station={station}/>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            </ImageBackground>
        </View>
    );
};

const logo3 = require('./../../assets/images/logo4.jpeg')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    mapContainer: {
        flex: 1,
    },
    errMsg: {
        color: "red",
        fontSize: 23,
        textAlign: "center",
    },
    mainView: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        flex: 1,

    },
    stationTitle: {
        fontSize: 25,
        fontWeight: 300,
        textShadowColor: "gray",
        textAlign: 'center',
        margin: 5,
    },
    stationListContainer: {
    },
});

export default SelectChargingStation;
