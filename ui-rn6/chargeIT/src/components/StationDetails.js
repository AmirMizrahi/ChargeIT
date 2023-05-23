import {Text, View} from "react-native";
import React, {useState} from "react";

export const StationDetails = ((params) => {
    let station = {};
    Object.keys(params.station).map(key => {
        if (key === 'chargerType') {
            station["Charging Type"] = params.station[key];
        }
        if (key === 'pricePerVolt') {
            station["Price Per Volt"] = params.station[key] + "$";
        } else if (key === 'status') {
            station["Status"] = params.station['status'] === "NOT_CHARGING" ? "Ready for use" : "Not Available";
        }
    });


    return (
        <View style={styles.wrapper}>
        <View style={styles.stationContainer}>
            {
                Object.keys(station).map(key => {
                    return (

                        <Text style={styles.stationStatus} key={station.location}>
                            {key.toUpperCase()}: {station[key]}
                        </Text>
                    );
                })
            }
        </View>
            <Text style={styles.stationLocation}>{parseFloat(params.station.distance).toFixed(2)} km</Text>
        </View>

    )
})

export const styles = {
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        marginTop: 30,
        padding: 10,
        color: 'white',
        width: 300,
        maxHeight: 150,
        borderColor: 'white',
        borderWidth: 2,

    },
    container: {
        marginTop: 30,
        padding: 10,
        color: 'white',
        width: 300,
        maxHeight: 150,
        borderColor: 'white',
        borderWidth: 2,
        flex: 2,
        alignContent: 'space-between',
        flexDirection: 'column',
    },
    mainText: {
        fontSize: 30,
    },
    smallText: {
        color: "white",
        fontSize: 14,
        textAlign: 'left',
    },
    stationContainer: {
        borderWidth: 1,
        borderColor: "#000000",
        padding: 10,
        marginBottom: 10,
        maxWidth: 350
    },
    stationName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    stationLocation: {
        marginTop: 5,
        flex:1,
        fontSize: 14,
        textAlign: 'right'
    },
    stationStatus: {
        marginTop: 5,
        fontSize: 14,
        color: "gray",
    },
}