import {Text, View} from "react-native";
import React from "react";

export const StationDetails = ((params) => {

    const station = params.station;

    return (
        <View style={styles.container}>
            {
                Object.keys(station).map(key => {
                    return (

                        <Text style={styles.smallText}>
                            {key}: {station[key]}
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
        width: 250,
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