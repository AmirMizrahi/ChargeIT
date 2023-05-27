import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Buttons from "../../components/Buttons";
import { TextInput } from "react-native-gesture-handler";
import Spacer from "../../components/Spacer";

import { Entypo } from "@expo/vector-icons";
import { Context as StationsContext } from "../../context/StationsContext";

const CreateStation = ({ navigation, route }) => {
  const { createChargingStation } = useContext(StationsContext);
  const [pricePerVolt, setPrice] = useState("");
  const [stationName, setName] = useState("");
  const [chargerType, setSelectedValue] = useState("TYPE_0");
  const { latitude, longitude } = route.params;

  return (
    <View style={styles.mainView}>
      <Text style={styles.headerText}>Create New Charging Station</Text>
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
            style={styles.input}
            selectedValue={chargerType}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Type 0" value="TYPE_0" />
            <Picker.Item label="Type 1" value="TYPE_1" />
          </Picker>
        </View>
        <Buttons
          on_press={() => {
            createChargingStation({
              latitude,
              longitude,
              pricePerVolt,
              chargerType,
              stationName,
            });
            navigation.navigate("Stations");
          }}
          btn_text={"Create"}
        ></Buttons>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 16,
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
    marginLeft: 20,
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
    marginTop: 10,
  },
  label: {
    fontSize: 18,
  },
});

export default CreateStation;
