import React, {useContext, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Picker} from "@react-native-picker/picker";
import Buttons from "../../components/Buttons";
import Map from "../../components/Map";
import MapView, {Marker} from "react-native-maps";
import {TextInput} from "react-native-gesture-handler";
import Spacer from "../../components/Spacer";
import trackMyLocation from "../../hooks/trackMyLocation";

import {useIsFocused} from "@react-navigation/native";
import {Context as StationsContext} from "../../context/StationsContext";

const CreateStation = ({navigation, route}) => {
    const {getCurrentLocation, createChargingStation} =
        useContext(StationsContext);
    const [err] = trackMyLocation(useIsFocused(), getCurrentLocation);
    const [pricePerVolt, setPrice] = useState("");
    const [stationName, setName] = useState("");
    const [chargerType, setSelectedValue] = useState("TYPE_0");
    const {latitude, longitude} = route.params;

    // const handleMapPress = (event) => {
    //   const { coordinate } = event.nativeEvent;
    //   setLocation(coordinate);
    // };

    // const handleSavePress = () => {
    //   // Handle save location here
    //   console.log("Selected location:", location);
    // };

    return (
        <View style={styles.mainView}>
            <Text style={styles.headerText}>Create New Charging Station</Text>

            <View style={{borderColor: "red", borderWidth: 3}}>
                <Text>
                    {latitude},{longitude}
                </Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>Name: </Text>
                    <TextInput
                        editable
                        maxLength={40}
                        onChangeText={text => setName(text)}
                        value={stationName}
                        style={{padding: 10, borderWidth: 1, width: 150}}
                    />
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>Price per volt: </Text>
                    <TextInput
                        editable
                        keyboardType='number-pad'
                        maxLength={5}
                        onChangeText={text => setPrice(text)}
                        value={pricePerVolt}
                        style={{padding: 10, borderWidth: 1, width: 150}}
                    />
                </View>

                <View style={styles.viewGeneral}>
                    <Text style={styles.label}>pricePerVolt:</Text>
                    <TextInput style={styles.value} onChangeText={setPrice}></TextInput>
                </View>

                <View style={styles.viewGeneral}>
                    <Text style={styles.label}>chargerType:</Text>
                    <View style={{borderColor: "gray", borderStyle: 'bold', borderWidth: 2, height: 80}}>
                        <Picker
                            style={{height: 150, width: 200}}
                            itemStyle={{height: 100, width: 200, fontSize: 14}}
                            selectedValue={chargerType}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedValue(itemValue)
                            }
                        >
                            <Picker.Item label="Type 0" value="TYPE_0"/>
                            <Picker.Item label="Type 1" value="TYPE_1"/>
                        </Picker>
                        <Buttons
                            on_press={() => {
                                createChargingStation({
                                    latitude,
                                    longitude,
                                    pricePerVolt,
                                    chargerType,
                                    stationName
                                });
                                navigation.navigate('Stations');
                            }}

                            btn_text={"Create"}
                        ></Buttons>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    headerText: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 16,
    },
    viewGeneral: {
        flexDirection: "row",
    },
    buttons: {
        alignItems: "center",
    },
    smallText: {
        maxWidth: "50%",
        color: "#999",
        fontSize: 14,
        textAlign: "center",
        paddingTop: 10,
    },
    mainView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginTop: 100
    },
    picker: {
        borderColor: "blue",
        borderWidth: 3,
        fontSize: 20,
        justifyContent: "center",
        flex: 1,
        height: 20
    }
});

export default CreateStation;
