import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native";
import Spacer from "../../components/Spacer";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Registration = ({ navigation }) => {
  const { state, register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(state);
  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.container}>
          <Spacer>
            <Text style={styles.headText}>Sign Up for ChargeIT!</Text>
          </Spacer>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={"Enter Email"}
            />
          </View>
          <Spacer></Spacer>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              secureTextEntry
              label="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={"Enter Password"}
            />
          </View>
          {state.errorMessage ? (
            <Text style={styles.errorMessage}>{state.errorMessage}</Text>
          ) : null}
          <Spacer>
            <Button
              style={styles.button}
              title="Sign Up"
              onPress={() => register({ email, password, navigation })}
            />
          </Spacer>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Registration.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  headText: {
    fontSize: 25,
    fontWeight: "bold",
    position: "relative",
  },
  input: {
    position: "relative",
    height: "100%",
    width: "90%",
    paddingLeft: 20,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 20,
  },
  contentContainerStyle: {
    paddingVertical: 150,
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed",
    width: "95%",
    borderRadius: 10,
    height: 60,
    paddingLeft: 20,
  },
});

export default Registration;
