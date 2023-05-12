import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Buttons from "../../components/Buttons";
import Spacer from "../../components/Spacer";

const MyStations = ({ navigation }) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.noStationsText}>
        Youv'e currently don't have any stations yet.
      </Text>
      <Text style={styles.noStationsText}>Wan't to make money?</Text>
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
