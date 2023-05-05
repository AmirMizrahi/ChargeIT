import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import Buttons from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../../components/Spacer";

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  subText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* login form section */}
      <View style={styles.mainLoginView}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Image
            source={require("../../assets/images/waving_hand.png")}
            style={styles.wavingHand}
          />
        </View>
        <Text style={styles.subText}>{subText}</Text>
        <View style={{ flexDirection: "column", paddingTop: 20 }}>
          <View style={styles.inputView}>
            <TextInput
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#818181"
            />
          </View>

          <View style={styles.inputSubView}>
            <TextInput
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry={true}
              placeholderTextColor="#818181"
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <Spacer></Spacer>

          <Buttons
            btn_text={submitButtonText}
            on_press={() => onSubmit({ email, password, navigation })}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
  },
  wavingHand: {
    width: 30,
    height: 30,
  },
  subText: {
    fontSize: 14,
    paddingTop: 10,
    color: "#777",
  },
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
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthForm;
