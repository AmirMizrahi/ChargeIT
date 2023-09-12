import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Context as StationsContext } from "../context/StationsContext";
import basicApi from "../api/basicApi";
import outsideStation from "../assets/images/outside_charging_station2.jpg"
import appStations from "../assets/images/appStations_30x30.png"
import * as Location from "expo-location";

const Map = () => {
  const [markerList, setMarkerList] = useState([]);
  const { state, fetchChargingStations } = useContext(StationsContext);
  const { currentLocation } = useContext(StationsContext).state;

  // Get all the locations from the server when screen renders
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const arrayOfStations = await fetchChargingStations();
        let jsonArray = arrayOfStations.map((obj) =>
          JSON.parse(Object.values(obj)[0])
        );

        let location = await Location.getCurrentPositionAsync({});
        let newLocation = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        };

        const outEVStationsObject = await basicApi.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${newLocation.latitude},${newLocation.longitude}&radius=5000&type=gas_station&key=AIzaSyCn9n4ARkLfQzaAkuGsSvW4agalcPixTQw`
        );
        const stations = outEVStationsObject.data.results;
        let formattedStations = [];
        stations.forEach(station => {
          formattedStations.push(
              {
                id:station.place_id,
                stationName:station.name,
                status:"Outer station",
                location : {
                  latitude: station.geometry.location.lat,
                  longitude: station.geometry.location.lng
                }
              })
        })
        jsonArray = jsonArray.concat(formattedStations);
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
        followsUserLocation={false}
        showsUserLocation={true}
      >
        {markerList.map((marker) => (
          <Marker
            key={marker.id}
            title={marker.stationName}
            description={marker.status}
            coordinate={{
              latitude: marker.location.latitude,
              longitude: marker.location.longitude,
            }}
            // pinColor={marker.status === "Outsource station" ? "green" : "red"} // Set green color for "Outsource station" markers
            image={marker.status === "Outer station" ? outsideStation : appStations}
            style={{ width: 3, height: 30 }}
          />
        ))}
      </MapView>
    );
};

const styles = StyleSheet.create({
  map: {
    height: 250
  },
});

export default Map;
