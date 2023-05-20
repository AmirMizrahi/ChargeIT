import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useBackHandler } from "@react-native-community/hooks";
import Buttons from "../../components/Buttons";
import Spacer from "../../components/Spacer";
import { Feather } from "@expo/vector-icons";

import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UsersContext } from "../../context/UsersContext";

const UserProfile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [mail, setMail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const { logout } = useContext(AuthContext);
  const { state, getUserInfo } = useContext(UsersContext);

  // Cancel return to the authentication flow.
  useBackHandler(() => {
    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await getUserInfo();
        setMail(val.email);
        setFirstName(val.firstName);
        setLastName(val.lastName);
        setPhone(val.phoneNumber);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
    // setMail(state.userValues.email);
    // setFirstName(state.userValues.firstName);
    // setLastName(state.userValues.lastName);
    // setPhone(state.userValues.phoneNumber);
  }, []); // runs only once when the component is mounted

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}>
        {userData ? userData.fname : ""} {userData ? userData.lname : ""}
      </Text>

      <View style={styles.viewGeneral}>
        <Feather name="mail" style={styles.tinyImages} />
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{mail}</Text>
      </View>

      <View style={styles.viewGeneral}>
        <Feather name="edit" style={styles.tinyImages} />
        <Text style={styles.label}>First name:</Text>
        <Text style={styles.value}>{firstName}</Text>
      </View>

      <View style={styles.viewGeneral}>
        <Feather name="edit" style={styles.tinyImages} />
        <Text style={styles.label}>Last name:</Text>
        <Text style={styles.value}>{lastName}</Text>
      </View>

      <View style={styles.viewGeneral}>
        <Feather name="phone" style={styles.tinyImages} />
        <Text style={styles.label}>Phone number:</Text>
        <Text style={styles.value}>{phone}</Text>
      </View>
      <Spacer></Spacer>
      <View style={styles.buttons}>
        <Buttons
          btn_text={"Update Profile"}
          on_press={() =>
            navigation.navigate("EditProfile", {
              mail: mail,
              firstName: firstName,
              lastName: lastName,
              phone: phone,
            })
          }
        />
        <Buttons
          btn_text={"Sign Out"}
          on_press={() => logout({ navigation })}
        />
      </View>
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
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  viewGeneral: {
    flexDirection: "row",
  },
  tinyImages: {
    color: "#333333",
    fontSize: 20,
    marginRight: 10,
  },
  buttons: {
    alignItems: "center",
  },
});

export default UserProfile;
