import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

import AuthForm from "./AuthForm";

const Registration = ({ navigation }) => {
  const { state, register, clearErrorMessage } = useContext(AuthContext);
  // Remove the errorMsg if available.
  useFocusEffect(
    React.useCallback(() => {
      return () => clearErrorMessage();
    }, [])
  );

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.container}>
          {/* Going to the a generic form */}
          <AuthForm
            headerText="Signup to ChargeIT"
            errorMessage={state.errorMessage}
            onSubmit={register}
            submitButtonText="Signup"
            subText="We're happy to meet you. Please signup to join our community"
          />

          <View style={styles.loginTextView}>
            <Text style={{ fontSize: 17, color: "#818181" }}>
              Already have an account?{" "}
            </Text>
            <Text
              style={{ fontSize: 18, color: "blue" }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </View>
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
  loginTextView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 40,
  },
});

export default Registration;
