import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import basicApi from "../../api/basicApi";
import Buttons from "../../components/Buttons";

const StationWatchScreen = ({ navigation, route }) => {
  const [stationDetails, setStation] = useState({});
  const [isCharging, setIsCharging] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  Object.keys(route.params).map((key) => {
    console.log(route);
    console.log(route.params);
    // if (key === 'location') {
    //     stationDetails["Location"] = "Longitude: " + route.params[key].longitude + ", Latitude: " + route.params[key].latitude
    // }
    if (key === "chargerType") {
      stationDetails["Charging Type"] = route.params[key];
    } else if (key === "stationName") {
      stationDetails["Station Name"] = route.params[key];
    } else if (key === "pricePerVolt") {
      stationDetails["Price Per Volt"] = route.params[key] + "$";
    } else if (key === "status") {
      stationDetails["Status"] =
        route.params["status"] === "NOT_CHARGING"
          ? "Available"
          : "Not Available";
    }
  });

  return (
    <View style={styles.mainView}>
      <Text style={styles.stationName}>Charging Station Details</Text>
      <View style={{ paddingBottom: 20 }}>
        {Object.keys(stationDetails).map((key) => {
          return (
            <View key={key}>
              <Text
                style={
                  key === "stationName"
                    ? styles.stationName
                    : styles.stationStatus
                }
              >
                {key}: {stationDetails[key]}
              </Text>
            </View>
          );
        })}
      </View>
      {!isCharging && (
        <Buttons
          btn_text={"Charge"}
          on_press={async () => {
            //Alert.alert('Charging ...',null, [{text: 'OK', onPress: () => console.log('OK Pressed')}] )

            try {
              await basicApi
                .put(
                  "/chargingStations/charge?chargingStationId=" +
                    route.params["id"]
                )
                .then(() => {
                  setIsCharging(true);
                  setTotalPrice(0);
                });
            } catch (err) {
              console.log(err + "hi");
              Alert.alert(err, null, [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ]);
            }
          }}
        ></Buttons>
      )}

      {isCharging && (
        <Buttons
          btn_text={"Stop"}
          on_press={async () => {
            try {
              await basicApi
                .put(
                  "/chargingStations/unCharge?chargingStationId=" +
                    route.params["id"]
                )
                .then((response) => {
                  let totalPrice = response.data.payment;
                  setTotalPrice(totalPrice);
                  setIsCharging(false);
                  Alert.alert("Charging session ended", null, [
                    {
                      text: "OK",
                      onPress: () => console.log("OK Pressed"),
                    },
                  ]);
                });
            } catch (err) {
              console.log(err);
              Alert.alert("Something went wrong", null, [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ]);
            }
          }}
        ></Buttons>
      )}
      {totalPrice ? (
        <Text style={{ textAlign: "center" }}>
          <Text>Total to Pay: </Text>
          <Text style={{ fontWeight: "bold" }}>{totalPrice}$</Text>
        </Text>
      ) : null}
      {isCharging && (
        <Text style={styles.ischarging}>Station is charging . . .</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  ischarging: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "400",
  },
  noStationsText: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "400",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  stationContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    marginBottom: 10,
  },
  stationName: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 15,
  },
  stationLocation: {
    marginTop: 5,
    fontSize: 14,
  },
  stationStatus: {
    marginTop: 5,
    fontSize: 17,
    color: "gray",
    textAlign: "center",
  },
});

export default StationWatchScreen;
