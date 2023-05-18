import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Buttons from "../../components/Buttons";
import Map from "../../components/Map";
import MapView, { Marker } from "react-native-maps";
import { TextInput } from "react-native-gesture-handler";
import Spacer from "../../components/Spacer";
import trackMyLocation from "../../hooks/trackMyLocation";

import { useIsFocused } from "@react-navigation/native";
import { Context as StationsContext } from "../../context/StationsContext";

const CreateStation = ({ navigation, route }) => {
  const { getCurrentLocation, createChargingStation } =
    useContext(StationsContext);
  const [err] = trackMyLocation(useIsFocused(), getCurrentLocation);
  const [pricePerVolt, setPrice] = useState("");
  const [chargerType, setSelectedValue] = useState("TYPE_0");
  const { latitude, longitude } = route.params;

  // const handleMapPress = (event) => {
  //   const { coordinate } = event.nativeEvent;
  //   setLocation(coordinate);
  // };

  // const handleSavePress = () => {
  //   // Handle save location here
  //   console.log("Selected location:", location);
  // };

  return (
    <>
      <View style={styles.mainView}>
        <Text style={styles.headerText}>Create New Charging Station</Text>
      </View>
      <View style={{ borderColor: "red", borderWidth: 3 }}>
        <Text>
          {latitude},{longitude}
        </Text>
        <View style={styles.viewGeneral}>
          <Text style={styles.label}>pricePerVolt:</Text>
          <TextInput style={styles.value} onChangeText={setPrice}></TextInput>
        </View>

        <View style={styles.viewGeneral}>
          <Text style={styles.label}>chargerType:</Text>
          <View
            style={{
              borderColor: "blue",
              borderWidth: 3,
              fontSize: 20,
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Picker
              selectedValue={chargerType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Type 0" value="TYPE_0" />
              <Picker.Item label="Type 1" value="TYPE_1" />
            </Picker>
            <Buttons
              on_press={() =>
                createChargingStation({
                  latitude,
                  longitude,
                  pricePerVolt,
                  chargerType,
                })
              }
              btn_text={"Create"}
            ></Buttons>
          </View>
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
