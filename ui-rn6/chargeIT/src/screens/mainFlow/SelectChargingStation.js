import React, { useEffect, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Spacer from "../../components/Spacer";
import Map from "../../components/Map";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { Context as StationsContext } from "../../context/StationsContext";
import trackMyLocation from "../../hooks/trackMyLocation";
import * as Location from "expo-location";
import { StationDetails } from "../../components/StationDetails";

const SelectTemp = ({ navigation }) => {
  const { getCurrentLocation, fetchChargingStationsByDistance } =
    useContext(StationsContext);
  const [err] = trackMyLocation(useIsFocused(), getCurrentLocation);
  const [stationsList, setStations] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchStationsOnLoad = async () => {
      try {
        let location = await Location.getCurrentPositionAsync({});
        let newLocation = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        };

        let stations = {};
        const arrayOfStations = await fetchChargingStationsByDistance(
          newLocation
        );

        const jsonArray = arrayOfStations.map((obj) => {
          let sta = JSON.parse(Object.values(obj)[0]);
          return { ...sta, distance: Object.keys(obj)[0] };
        });

        setStations(jsonArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStationsOnLoad();
  }, [isFocused]);

  const navigateToStationWatchScreen = (station) => {
    if (station.status === "CHARGING") {
      Alert.alert("Station is NOT available!", null, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      navigation.navigate("StationWatchScreen", station);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <Map />
        {err ? (
          <Text style={styles.errMsg}> Please enable location services</Text>
        ) : null}
      </View>
      <Spacer />
      <View style={styles.mainView}>
        <Text style={styles.stationTitle}>Stations Around You</Text>
        <ScrollView contentContainerStyle={styles.stationListContainer}>
          {stationsList.map((station) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={station.id}
                onPress={() => navigateToStationWatchScreen(station)}
              >
                <View>
                  <StationDetails station={station} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  stationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  stationListContainer: {
    alignItems: "center",
  },
});

export default SelectTemp;
