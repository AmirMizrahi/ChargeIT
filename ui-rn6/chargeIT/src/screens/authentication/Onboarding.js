import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Buttons from "../../components/Buttons";

const Onboarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Main Image */}
      <View
        style={{ flex: 3, flexDirection: "column", backgroundColor: "#ddd" }}
      >
        <ImageBackground
          source={require("../../assets/images/onboardingPic.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      {/* Button and Text */}
      <View style={{ flex: 2, backgroundColor: "#fff" }}>
        {/* Text*/}
        <View style={styles.mainViewTextButton}>
          <Text style={styles.mainText}>ChargeIT</Text>
          <Text style={styles.smallText}>
            Welcome to ChargeIT - New way to charge your car!
          </Text>
        </View>

        {/* Button */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Buttons
            btn_text={"Get Started"}
            on_press={() => navigation.navigate("Resolve")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    backgroundColor: "white",
  },
  mainViewTextButton: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  mainText: {
    fontSize: 30,
  },
  smallText: {
    maxWidth: "50%",
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    paddingTop: 10,
  },
});

export default Onboarding;
