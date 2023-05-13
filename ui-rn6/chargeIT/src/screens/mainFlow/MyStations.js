import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Buttons from "../../components/Buttons";
import Spacer from "../../components/Spacer";

const MyStations = ({ navigation }) => {
  return (
    <View style={styles.mainView}>
        <Text style={styles.noStationsText}>
            Need to get your car charged?
        </Text>
        <Spacer></Spacer>
        <Buttons
            btn_text={"Find Charging Stations Around Me"}
            on_press={() => navigation.navigate("StationSelectScreen")}
        />
        <Spacer></Spacer><Spacer></Spacer>
      <Text style={styles.noStationsText}>
        You currently don't have any stations.
      </Text>
      <Text style={styles.noStationsText}>Want to make money?</Text>
      <Spacer></Spacer>
      <Buttons
        btn_text={"Create Station"}
        on_press={() => navigation.navigate("SelectLocation")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noStationsText: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "400",
  },
});

export default MyStations;
