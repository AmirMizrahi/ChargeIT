import {ActivityIndicator, Alert, Button, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {StationDetails} from "../../components/StationDetails";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Context as StationsContext} from "../../context/StationsContext";
import * as Location from 'expo-location';
import {ScrollView} from "react-native";
import {useIsFocused} from "@react-navigation/native";

export const StationSelectScreen = ({navigation}) => {
    const [stationsList, setStations] = useState([]);
    const isFocused = useIsFocused();
    const {
        fetchChargingStationsByDistance
    } = useContext(StationsContext);
    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                let location = await Location.getCurrentPositionAsync({});
                console.log(location.coords.latitude);

                let newLocation = {longitude: location.coords.longitude, latitude: location.coords.latitude};

                let stations = {};
                const arrayOfStations = await fetchChargingStationsByDistance(newLocation);
                console.log(arrayOfStations);
                const jsonArray = arrayOfStations.map((obj) => {
                        let sta = JSON.parse(Object.values(obj)[0]);
                        return {...sta, distance: Object.keys(obj)[0]}
                    }
                );
                console.log(jsonArray);

                setStations(jsonArray);
                // console.log(arrayOfStations);
                // for (let station of arrayOfStations) {
                //     stations[Object.keys(station)[0]] = {...JSON.parse(Object.values(station)[0]), distance: Object.keys(station)[0]};
                //     console.log(Object.keys(station)[0]);
                // }
                // console.log(stations);
                // const jsonArray = JSON.parse(arrayOfStations);


                //      setStations(stations);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMarkers();
    }, [isFocused]);

    if (!stationsList[0]) {
        return (
            <View style={styles.mainView}>
                <ActivityIndicator size="large" style={{marginTop: 200}}/>
                <Text style={styles.smallText}>Searching for stations around you...</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.mainView}>
                <Text style={styles.stationName}>Stations Around You</Text>
                <ScrollView contentContainerStyle={styles.scroll}>
                {
                    stationsList.map(station => {
                        return (
                            <TouchableOpacity
                                onPress={() => station.status === 'CHARGING' ? Alert.alert('Station is NOT available!', null, [{
                                    text: 'OK',
                                    onPress: () => console.log('OK Pressed')
                                }]) : navigation.navigate('StationWatchScreen', station)}>
                                <StationDetails
                                    key={station.id}
                                    station={station}>
                                </StationDetails>
                            </TouchableOpacity>
                        );
                    })
                }
                </ScrollView>
            </View>
        );
    }
};

const getStations = () => {
    return fetch('/chargingStations/getAllChargingStationsLocations')
        .then(response => response.json())
        .then(json => {
            return json.locations;
        })
        .catch(error => {
            console.error(error);
        });
};


const styles = StyleSheet.create({
    scroll: {
      paddingTop: 10,
      paddingBottom: 10
    },
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
        justifyContent: 'flex-start',
        alignContent: 'space-between',
        backgroundColor: '#465bd8',
        color: 'white',

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
        marginTop: 60,
        color: 'white'
    },
    smallText: {
        maxWidth: "50%",
        color: "#999",
        fontSize: 14,
        textAlign: "center",
        paddingTop: 10,
    },
    mainView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginTop: 100
    },
    noStationsText: {
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "400",
    },

    stationName: {
        fontSize: 16,
        fontWeight: "bold",
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