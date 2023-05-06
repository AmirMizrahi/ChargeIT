import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useBackHandler } from "@react-native-community/hooks";
import Buttons from "../../components/Buttons";
import Spacer from "../../components/Spacer";
import { Context as AuthContext } from "../../context/AuthContext";

const UserProfile = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  // Cancel return to the authentication flow.
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

      <Buttons btn_text={"Sign Out"} on_press={() => logout({ navigation })} />
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

export default UserProfile;
