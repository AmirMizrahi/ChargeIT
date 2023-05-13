import {Text, View} from "react-native";
import React, {useState} from "react";

export const StationDetails = ((params) => {
    let station = {};
    Object.keys(params.station).map(key => {
        if (key === 'location') {
            station["Location"] = "Longitude: "+params.station[key].longitude + ", Latitude: "+params.station[key].latitude
        }
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
        <View style={styles.container}>
            {
                Object.keys(station).map(key => {
                    return (

                        <Text style={styles.smallText} key={station.location}>
                            {key.toUpperCase()}: {station[key]}
                        </Text>
                    );
                })
            }
        </View>
    )
})

export const styles = {
    container: {
        marginTop: 30,
        padding: 10,
        color: 'white',
        width: 300,
        maxHeight: 150,
        borderColor: 'white',
        borderWidth: 2,
        flex: 1,
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
    }
}