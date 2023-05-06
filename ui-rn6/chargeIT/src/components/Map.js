import React from "react";
import { Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { requestForegroundPermissionsAsync } from "expo-location";

const Map = () => {
  //const { granted } = await requestForegroundPermissionsAsync();
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 32.109333,
        longitude: 34.855499,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
