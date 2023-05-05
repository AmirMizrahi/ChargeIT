import React, { useContext, useState } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "./AuthForm";

const Login = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);

  return (
    <ScrollView>
      <View style={styles.mainLoginView}>
        <AuthForm
          headerText="Login to ChargeIT"
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText="Login"
          subText="We're happy to see you again. You can continue where you left off by
            logging in :)"
        />
        <View>
          <View style={styles.forgetPasswordView}>
            <Text style={styles.forgetPassword}>Forgot Password?</Text>
          </View>
        </View>
      </View>

      <View style={styles.loginView}>
        <Text style={styles.loginText}>Don't have a account? </Text>
        <Text
          style={{ fontSize: 18, color: "blue" }}
          onPress={() => navigation.navigate("Registration")}
        >
          Sign Up
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    position: "relative",
    height: "100%",
    width: "90%",
    paddingLeft: 20,
  },
  mainLoginView: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: "3%",
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
  forgetPasswordView: {
    width: "95%",
    marginBottom: 10,
  },
  forgetPassword: {
    fontSize: 17,
    color: "#818181",
    alignSelf: "flex-end",
    paddingTop: 10,
  },
  loginView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    marginBottom: 40,
  },
  loginText: {
    fontSize: 17,
    color: "#818181",
  },
  inputSubView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed",
    width: "95%",
    borderRadius: 10,
    height: 60,
    paddingLeft: 20,
    marginTop: 20,
  },
});
