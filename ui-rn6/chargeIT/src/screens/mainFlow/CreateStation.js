import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Buttons from "../../components/Buttons";
import Map from "../../components/Map";
import MapView, { Marker } from "react-native-maps";
import { TextInput } from "react-native-gesture-handler";
import Spacer from "../../components/Spacer";
import trackMyLocation from "../../hooks/trackMyLocation";

import { useIsFocused } from "@react-navigation/native";
import { Context as StationsContext } from "../../context/StationsContext";

const CreateStation = ({ navigation }) => {
  const { getCurrentLocation } = useContext(StationsContext);

  const [err] = trackMyLocation(useIsFocused(), getCurrentLocation);

  const [location, setLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
  };

  const handleSavePress = () => {
    // Handle save location here
    console.log("Selected location:", location);
  };

  return (
    <>
      <View style={styles.mainView}>
        <Text style={styles.headerText}>Create New Charging Station</Text>
      </View>
      <View style={{ borderColor: "red", borderWidth: 3 }}>
        <View style={styles.viewGeneral}>
          <Text style={styles.label}>pricePerVolt:</Text>
          <TextInput style={styles.value}></TextInput>
        </View>

        <View style={styles.viewGeneral}>
          <Text style={styles.label}>chargerType:</Text>
          <Text style={styles.value}>{}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
  },
  viewGeneral: {
    flexDirection: "row",
  },
  buttons: {
    alignItems: "center",
  },
});

export default CreateStation;
