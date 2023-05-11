import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <MapView
      style={styles.map}
      // initialRegion={{
      //   latitude: 32.109333,
      //   longitude: 34.855499,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      // }}
      followsUserLocation={true}
      showsUserLocation={true}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
