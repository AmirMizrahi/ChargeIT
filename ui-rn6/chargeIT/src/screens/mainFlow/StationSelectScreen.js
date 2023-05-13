import {ActivityIndicator, Button, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {StationDetails} from "../../components/StationDetails";
import {TouchableOpacity} from "react-native-gesture-handler";
import basicApi from "../../api/basicApi";
import {Context as StationsContext} from "../../context/StationsContext";

export const StationSelectScreen = ({navigation}) => {
    const [stationsList, setStations] = useState([]);
    const {state, fetchChargingStations} = useContext(StationsContext);
    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const arrayOfStations = await fetchChargingStations();
                const jsonArray = arrayOfStations.map((obj) =>
                    JSON.parse(Object.values(obj)[0])
                );
                console.log(jsonArray);

                setStations(jsonArray);
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
            <View style={styles.container}>
                <Text style={styles.mainText}>Available Stations:</Text>
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
    }
});