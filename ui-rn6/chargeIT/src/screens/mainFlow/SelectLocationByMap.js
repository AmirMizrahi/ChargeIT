import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {TouchableOpacity} from "react-native-gesture-handler";

const SelectLocationByMap = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
  };

  const handleSavePress = () => {
    // Handle save location here
    console.log("Selected location:", location);
    navigation.navigate("CreateStation", {
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        followsUserLocation={true}
        showsUserLocation={true}
        onPress={handleMapPress}
      >
        {location && (
          <Marker
            coordinate={location}
            title="Selected Location"
            description="This is the selected location"
          />
        )}
      </MapView>
      { location != null && <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={handleSavePress}>
          Save Location
        </Text>
      </View>}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Please Select Location</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  textContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  text: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default SelectLocationByMap;
