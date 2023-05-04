import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useBackHandler } from "@react-native-community/hooks";

const UserProfileScreen = ({ navigation }) => {
  useBackHandler(() => {
    return true;
  });
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{}</Text>

      <Text style={styles.label}>First name:</Text>
      <Text style={styles.value}>{}</Text>

      <Text style={styles.label}>Last name:</Text>
      <Text style={styles.value}>{}</Text>

      <Text style={styles.label}>Phone number:</Text>
      <Text style={styles.value}>{}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    margin: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default UserProfileScreen;
