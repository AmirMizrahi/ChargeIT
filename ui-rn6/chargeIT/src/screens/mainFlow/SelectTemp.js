import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Map from "../../components/Map";
import { requestForegroundPermissionsAsync } from "expo-location";

const SelectTemp = ({ navigation }) => {
  const [err, setErr] = useState(null);

  const startWatching = async () => {
    try {
      await requestForegroundPermissionsAsync();
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    startWatching();
  }, []);

  return (
    <View>
      <Map />
      {err ? <Text> Please enable location services</Text> : <Text>Hi</Text>}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SelectTemp;
