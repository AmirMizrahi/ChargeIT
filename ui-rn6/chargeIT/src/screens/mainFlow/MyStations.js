import React, { useState, useEffect, useContext } from "react";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import Buttons from "../../components/Buttons";
import Spacer from "../../components/Spacer";
import { Context as StationsContext } from "../../context/StationsContext";

const MyStations = ({ navigation }) => {
  const { state, getAllStationsByUser } = useContext(StationsContext);
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
    const { id, location, status, pricePerVolt } = stationDetails;

    return (
      <View key={id} style={styles.stationContainer}>
        <Text style={styles.stationName}>Station ID: {id}</Text>
        <Text style={styles.stationLocation}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
        <Text style={styles.stationStatus}>Status: {status}</Text>
        <Text style={styles.stationPrice}>Price per Volt: {pricePerVolt}</Text>
      </View>
    );
  };

  if (areStationsAvailable) {
    if (usersStationsAvailable && usersStationsAvailable.length > 0) {
      return (
        <>
          <View style={styles.container}>
            {usersStationsAvailable.map(renderStation)}
          </View>
          <View>
            <Buttons
              btn_text={"Create another station?"}
              on_press={() => navigation.navigate("SelectLocation")}
            />
          </View>
        </>
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
        <Buttons
          btn_text={"Create Station"}
          on_press={() => navigation.navigate("SelectLocation")}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 10,
  },
  stationContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    marginBottom: 10,
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

export default MyStations;
