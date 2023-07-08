import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Buttons from "../../components/Buttons";
import { TextInput } from "react-native-gesture-handler";
import Spacer from "../../components/Spacer";

import { Entypo } from "@expo/vector-icons";
import { Context as StationsContext } from "../../context/StationsContext";

const EditStation = ({ navigation, route }) => {
  const { getChargingStationById, updateChargingStation } =
    useContext(StationsContext);
  const [pricePerVolt, setPrice] = useState("");
  const [stationName, setName] = useState("");
  const [tempName, setTempName] = useState(""); // Only used to the text header
  const [chargerType, setSelectedValue] = useState("TYPE_0");
  const { latitude, longitude } = route.params;

  // Fetch the selected charging station whenever user is got inside this screen:
  useEffect(() => {
    const fetchChargingStationData = async () => {
      try {
        const chargingStation = await getChargingStationById({
          stationId: route.params.stationId, // Assuming the stationId is passed through route.params
        });
        setPrice(chargingStation.pricePerVolt.toString());
        setName(chargingStation.stationName);
        setTempName(chargingStation.stationName);
        setSelectedValue(chargingStation.chargerType);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChargingStationData();
  }, [getChargingStationById, route.params.stationId]);

  return (
    <View style={styles.mainView}>
      <Text style={styles.headerText}>Edit {tempName} Station</Text>
      <Spacer></Spacer>
      <View>
        <View style={styles.lineTextAndInput}>
          <Entypo name="add-user" size={24} color="black" />
          <Text style={styles.label}> Station Name: </Text>
          <TextInput
            editable
            maxLength={40}
            onChangeText={setName}
            value={stationName}
            style={styles.input}
          />
        </View>
        <View style={styles.lineTextAndInput}>
          <Entypo name="price-tag" size={24} color="black" />
          <Text style={styles.label}> Price per Volt: </Text>
          <TextInput
            editable
            keyboardType="number-pad"
            maxLength={5}
            onChangeText={setPrice}
            value={pricePerVolt}
            style={styles.input}
          />
        </View>

        <View style={styles.lineTextAndInput}>
          <Entypo name="battery" size={24} color="black" />
          <Text style={styles.label}> Type of Charger:</Text>
          <Picker
            style={styles.picker}
            selectedValue={chargerType}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Type 0" value="TYPE_0" />
            <Picker.Item label="Type 1" value="TYPE_1" />
          </Picker>
        </View>
        <View style={{ paddingTop: 50 }}>
          <Buttons
            on_press={() => {
              updateChargingStation({
                latitude,
                longitude,
                pricePerVolt,
                chargerType,
                stationName,
              });
              navigation.navigate("Stations");
            }}
            btn_text={"Update Station"}
          ></Buttons>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  buttons: {
    alignItems: "center",
  },
  smallText: {
    maxWidth: "50%",
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    paddingTop: 10,
  },
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  picker: {
    fontSize: 20,
    justifyContent: "center",
    flex: 1,
    height: 20,
  },
  input: {
    width: "60%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
  },
  lineTextAndInput: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
  },
});

export default EditStation;