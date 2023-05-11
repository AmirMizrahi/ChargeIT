import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Map from "../../components/Map";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { Context as StationsContext } from "../../context/StationsContext";
import trackMyLocation from "../../hooks/trackMyLocation";

const SelectTemp = () => {
  const { getCurrentLocation } = useContext(StationsContext);

  const [err] = trackMyLocation(useIsFocused(), getCurrentLocation);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View>
        <Map />
        {err ? (
          <Text style={styles.errMsg}> Please enable location services</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errMsg: {
    color: "red",
    fontSize: 23,
    textAlign: "center",
  },
});

export default SelectTemp;
