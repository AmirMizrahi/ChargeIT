import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Buttons from "../../components/Buttons";
import { Context as AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* login form section */}
      <View style={styles.mainLoginView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30 }}>Welcome Back!</Text>
          <Image
            source={require("../../assets/images/waving_hand.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>
        <Text style={{ fontSize: 14, paddingTop: 10, color: "#777" }}>
          We're happy to see you again. You can continue where you left off by
          logging in :)
        </Text>

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

          <View style={{ width: "95%", marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 17,
                color: "#818181",
                alignSelf: "flex-end",
                paddingTop: 10,
              }}
            >
              Forgot Password?
            </Text>
          </View>

          <Buttons
            btn_text={"Sign In"}
            on_press={() => signin({ email, password })}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundColor: "#fff",
          marginBottom: 40,
        }}
      >
        <Text style={{ fontSize: 17, color: "#818181" }}>
          Don't have a account?{" "}
        </Text>
        <Text
          style={{ fontSize: 18, color: "#333" }}
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
