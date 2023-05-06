import { Button, StyleSheet, Text, View} from "react-native";
import React from "react";
import {StationDetails} from "../../components/StationDetails";
import {TouchableOpacity} from "react-native-gesture-handler";
import basicApi from "../../api/basicApi";

export const StationSelectScreen = ({navigation, route}) => {
    //const stationDetails = route.params;

    let stationsList = [{id: '101', owner: 'Dan'}, {id: '10505', owner: "mali"}];


    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Available Stations:</Text>
            {
                stationsList.map(station => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('StationWatchScreen', station)}>
                    <StationDetails
                                    key={station.id}
                                    station={station}>
                    </StationDetails>
                    </TouchableOpacity>
                );
            })
            }
            <Button  title='get' onPress={async () => {
                try {
                    basicApi.get('/chargingStations/getAllChargingStationsLocations').then(response => console.log(stationsList = response.data))
                }
                catch(err) {console.log(err)}
            }}></Button>
        </View>
    );
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
        justifyContent:'center',
        width:'95%',
        backgroundColor:"#465bd8",
        height:50,
        marginBottom:30,
        borderRadius:10,
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