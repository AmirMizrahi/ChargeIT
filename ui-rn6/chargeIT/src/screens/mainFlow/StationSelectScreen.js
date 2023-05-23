import {ActivityIndicator, Button, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {StationDetails} from "../../components/StationDetails";
import {TouchableOpacity} from "react-native-gesture-handler";
import basicApi from "../../api/basicApi";
import {Context as StationsContext} from "../../context/StationsContext";
import * as Location from 'expo-location';

export const StationSelectScreen = ({navigation}) => {
    const [stationsList, setStations] = useState([]);
    const {state, fetchChargingStations, getCurrentLocation, fetchChargingStationsByDistance} = useContext(StationsContext);
    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                let location = await Location.getCurrentPositionAsync({});
                console.log(location.coords.latitude);

                let newLocation = {longitude: location.coords.longitude, latitude: location.coords.latitude};

                let stations = {};
                const arrayOfStations = await fetchChargingStationsByDistance(newLocation);
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
    }, []);

    if (!state) {
        return <ActivityIndicator size="large" style={{marginTop: 200}}/>;
    } else {
        return (
            <View style={styles.mainView}>
                <Text style={styles.stationName}>Available Stations:</Text>
                {
                    stationsList.map(station => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('StationWatchScreen', station)}>
                                <StationDetails
                                    key={station.location}
                                    station={station}>
                                </StationDetails>
                            </TouchableOpacity>
                        );
                    })
                }
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