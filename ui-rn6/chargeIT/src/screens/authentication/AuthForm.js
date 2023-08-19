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
import ErrorText from "../../components/ErrorText";

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
          <ErrorText errorMessage={errorMessage}/>
          <Spacer></Spacer>

          <View style={{ alignItems: "center" }}>
            <Buttons
              btn_text={submitButtonText}
              on_press={() => onSubmit({ email, password, navigation })}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 30,
    textAlign: "center"
  },
  wavingHand: {
    width: 30,
    height: 30,
  },
  subText: {
    fontSize: 14,
    paddingTop: 10,
    color: "#777",
    textAlign: "center"
  },
  input: {
    position: "relative",
    height: "100%",
    width: "90%",
    paddingLeft: 20,
  },
  mainLoginView: {
    flex: 2,
    justifyContent: "center",
    flexDirection: "column",
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
});

export default AuthForm;
