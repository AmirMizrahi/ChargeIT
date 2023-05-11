import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Context as StationsContext } from "../context/StationsContext";

const Map = () => {
  const [markerList, setMarkerList] = useState([]);
  const { state, fetchChargingStations } = useContext(StationsContext);
  const { currentLocation } = useContext(StationsContext).state;

  // Get all the locations from the server when screen renders
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const arrayOfStations = await fetchChargingStations();
        const jsonArray = arrayOfStations.map((obj) =>
          JSON.parse(Object.values(obj)[0])
        );
        setMarkerList(jsonArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarkers();
  }, []);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  if (state)
    return (
      <MapView
        style={styles.map}
        // Location on load:
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        // Following user:
        region={{
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        followsUserLocation={true}
        showsUserLocation={true}
      >
        {markerList.map((marker) => (
          <Marker
            key={marker.location.latitude}
            title={marker.chargerType}
            description={marker.status}
            coordinate={{
              latitude: marker.location.latitude,
              longitude: marker.location.longitude,
            }}
          />
        ))}
      </MapView>
    );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
