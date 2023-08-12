import React, {useState, useEffect, useContext} from "react";
import {useIsFocused} from "@react-navigation/native";
import {View, Text, StyleSheet} from "react-native";
import Buttons from "../../components/Buttons";
import Spacer from "../../components/Spacer";
import {Context as StationsContext} from "../../context/StationsContext";
import {ScrollView} from "react-native";
import MyStationCard from "../../components/MyStationCard";

const MyStations = ({navigation}) => {
    const {state, getAllStationsByUser} = useContext(StationsContext);
    const [areStationsAvailable, setAreStationsAvailable] = useState(false);
    const [usersStationsAvailable, setUsersStationsAvailable] = useState(null);

    const isFocused = useIsFocused();

    // Check if there are stations available for the user.
    useEffect(() => {
        const calculateBooleanArgument = async () => {
            try {
                const result = await getAllStationsByUser();
                if (result.length > 0) {
                    setAreStationsAvailable(true);
                    setUsersStationsAvailable(result);
                    console.log(result);
                } else {
                    setAreStationsAvailable(false);
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        if (isFocused) {
            calculateBooleanArgument();
        }
    }, [isFocused]);
    //

    const renderStation = (station) => {
        const stationDetails = JSON.parse(Object.values(station)[0]);
        const {id, location, status, pricePerVolt, chargerType, stationName, reviews} = stationDetails;

        const avgRat = reviews.reduce((sum, review) => sum + review.grade, 0) / reviews.length;

        return (
            <View key={id} style={{margin: 10}}>
                <MyStationCard details={{
                    name: stationName,
                    type: chargerType,
                    price: pricePerVolt,
                    status: status,
                    location: location,
                    avgRat: avgRat,
                    id: id
                }} navigation={navigation}/>
            </View>
        );
    };

    if (areStationsAvailable) {
        if (usersStationsAvailable && usersStationsAvailable.length > 0) {
            return (
                <View style={styles.mainView}>
                    <Text style={styles.title}>Manager your Stations</Text>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        {usersStationsAvailable.map(renderStation)}
                    </ScrollView>
                    <View style={styles.buttonViewContainer}>
                        <Buttons
                            btn_text={" Create another station "}
                            on_press={() => navigation.navigate("SelectLocation")}
                        />
                    </View>
                </View>
            );
        }
    } else {
        return (
            <View style={styles.mainView}>
                <Spacer></Spacer>
                <Text style={styles.noStationsText}>
                    You currently don't have any stations.
                </Text>
                <Text style={styles.noStationsText}>Want to make money?</Text>
                <Spacer></Spacer>
                <View style={styles.buttonViewContainer}>
                    <Buttons
                        btn_text={"Create Station"}
                        on_press={() => navigation.navigate("SelectLocation")}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    mainView: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
    },
    title: {
        textAlign: "center",
        fontSize: 23,
        textShadowColor: "gray",
    },
    noStationsText: {
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "400",
    },
    container: {
        flex: 1,
        padding: 10,
    },
    stationContainer: {
        padding: 10,
        marginBottom: 10,
        maxWidth: 350,
        justifyContent: "center",
        textAlign: "center",
        justifyItems: "center",
        borderRight: "4 bold",
    },
    stationName: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 15,
    },
    stationLocation: {
        marginTop: 5,
        fontSize: 14,
    },
    stationStatus: {
        marginTop: 5,
        fontSize: 14,
        color: "gray",
        fontWeight: "bold",
    },
    scroll: {
        paddingTop: 10,
        paddingBottom: 10,
    },

    wrapper: {
        flex: 1,
        flexDirection: "row",
        alignContent: "space-between",
        marginTop: 30,
        padding: 10,
        color: "white",
        width: 300,
        maxHeight: 150,
        borderColor: "white",
        borderRadius: 6,
        borderWidth: 2,
    },

    buttonViewContainer: {
        alignContent:'center',
        alignItems:'center'
    }
});

export default MyStations;
