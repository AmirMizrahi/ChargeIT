import React, { useState, useEffect, useContext } from "react";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
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
  const [stations, setStations] = useState(null);
  const { logout } = useContext(AuthContext);
  const { state, getUserInfo, clearErrorMessage } = useContext(UsersContext);

  const isFocused = useIsFocused();

  // Cancel return to the authentication flow.
  useBackHandler(() => {
    return true;
  });

  //  Remove the errorMsg if available.
  useFocusEffect(
    React.useCallback(() => {
      return () => clearErrorMessage();
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await getUserInfo();
        setMail(val.email);
        setFirstName(val.firstName);
        setLastName(val.lastName);
        setPhone(val.phoneNumber);

        const chargingStationIDs = val.chargingStationDTOS.map(
          (station) => station.id
        );
        setStations(chargingStationIDs);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    if (isFocused) {
      fetchData();
    }
    // setMail(state.userValues.email);
    // setFirstName(state.userValues.firstName);
    // setLastName(state.userValues.lastName);
    // setPhone(state.userValues.phoneNumber);
  }, [isFocused]); // runs only once when the component is mounted

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {firstName ?? 'User'}</Text>

      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}>
        {userData ? userData.fname : ""} {userData ? userData.lname : ""}
      </Text>

      <View style={styles.viewGeneral}>
        <Feather name="mail" style={styles.tinyImages} />
        <Text style={styles.label}>Email: </Text>
        <Text style={styles.value}>{mail}</Text>
      </View>

      <View style={styles.viewGeneral}>
        <Feather name="edit" style={styles.tinyImages} />
        <Text style={styles.label}>First name: </Text>
        <Text style={styles.value}>{firstName}</Text>
      </View>

      <View style={styles.viewGeneral}>
        <Feather name="edit" style={styles.tinyImages} />
        <Text style={styles.label}>Last name: </Text>
        <Text style={styles.value}>{lastName}</Text>
      </View>

      <View style={styles.viewGeneral}>
        <Feather name="phone" style={styles.tinyImages} />
        <Text style={styles.label}>Phone number: </Text>
        <Text style={styles.value}>{phone}</Text>
      </View>

      {/*<View style={styles.viewGeneral}>*/}
      {/*  <Feather name="battery-charging" style={styles.tinyImages} />*/}
      {/*  <Text style={styles.label}>My charging stations:</Text>*/}
      {/*  <Text style={styles.value}>{stations}</Text>*/}
      {/*</View>*/}

      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}

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
              password: password
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
  title: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 23,
    textShadowColor: 'gray',
  },
  container: {
    display: 'flex',
    padding: 50,
    backgroundColor: "#fff",
    margin: 20,
    alignContent: 'space-between',
    justifyContent: 'center'

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
    paddingTop: 50
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default UserProfile;
