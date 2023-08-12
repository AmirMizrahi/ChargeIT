import { Text, TextBase, View } from "react-native";
import React, { useState } from "react";
import Spacer from "./Spacer";

export const StationDetails = (params) => {
  let station = {};
  Object.keys(params.station).map((key) => {
    if (key === "stationName") {
      station["Name"] = params.station[key];
    }
    if (key === "chargerType") {
      station["Charging Type"] = params.station[key];
    }
    if (key === "pricePerVolt") {
      station["Price Per Volt"] = params.station[key] + "₪";
    } else if (key === "status") {
      station["Status"] =
        params.station["status"] === "NOT_CHARGING"
          ? "Ready for use"
          : "Not Available";
    }
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.stationContainer}>
        {Object.keys(station).map((field) => {
          return (
            <Text key={field}>
              <Text style={{ fontWeight: "bold" }}> {field.toUpperCase()} </Text>
              <Text
                style={
                  field === "Status" && station[field] === "Ready for use"
                    ? styles.ready
                    : styles.stationStatus
                }
              >
                {station[field]}
              </Text>
            </Text>
          );
        })}
      </View>
      <Text style={styles.stationLocation}>
        {parseFloat(params.station.distance).toFixed(2)} {"\n"}km away
      </Text>
    </View>
  );
};

export const styles = {
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
    marginTop: 30,
    padding: 10,
    color: "white",
    width: 300,
    maxHeight: 150,
    borderColor: "white",
    borderRadius: 6,
    borderWidth: 2,
  },
  container: {
    marginTop: 30,
    padding: 10,
    color: "white",
    width: 300,
    maxHeight: 150,
    borderColor: "white",
    borderWidth: 2,
    flex: 2,
    alignContent: "space-between",
    flexDirection: "column",
  },
  ready: {
    backgroundColor: "green",
  },
  mainText: {
    fontSize: 30,
  },
  smallText: {
    color: "white",
    fontSize: 14,
    textAlign: "left",
  },
  stationContainer: {
    padding: 10,
    marginBottom: 10,
    maxWidth: 350,
    justifyContent: "center",
    textAlign: "center",
    justifyItems: "center",
    borderRight: "4 bold",
  },
  stationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stationLocation: {
    marginTop: 5,
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    padding: 10,
    borderColor: "white",
    borderRadius: 8,
    borderWidth: 2,
  },
  stationStatus: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
};
