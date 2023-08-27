import React, {useContext, useState, useEffect} from "react";
import {View, Text, StyleSheet, ImageBackground, Dimensions} from "react-native";
import {Picker} from "@react-native-picker/picker";
import Buttons from "../../components/Buttons";
import {TextInput} from "react-native-gesture-handler";
import Spacer from "../../components/Spacer";

import {Entypo} from "@expo/vector-icons";
import {Context as StationsContext} from "../../context/StationsContext";
import image from "../../assets/images/app-background-new.jpg";

const EditStation = ({navigation, route}) => {
    const {getChargingStationById, updateChargingStation} =
        useContext(StationsContext);
    const [pricePerVolt, setPrice] = useState("");
    const [stationName, setName] = useState("");
    const [tempName, setTempName] = useState(""); // Only used to the text header
    const [chargerType, setSelectedValue] = useState("TYPE_0");
    const {latitude, longitude} = route.params;

    // Fetch the selected charging station whenever user is got inside this screen:
    useEffect(() => {
        const fetchChargingStationData = async () => {
            try {
                const chargingStation = await getChargingStationById({
                    stationId: route.params.stationId, // Assuming the stationId is passed through route.params
                });
                setPrice(chargingStation.pricePerVolt.toString());
                setName(chargingStation.stationName);
                setTempName(chargingStation.stationName);
                setSelectedValue(chargingStation.chargerType);
            } catch (error) {
                console.log(error);
            }
        };

        fetchChargingStationData();
    }, [getChargingStationById, route.params.stationId]);

    return (
        <View style={styles.mainView}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.headerText}>Edit {tempName} Station</Text>
                <Spacer></Spacer>
                <View style={styles.fieldsContainer}>
                    <View style={styles.lineTextAndInput}>
                        <Entypo name="add-user" size={24} color="black"/>
                        <Text style={styles.label}> Station Name: </Text>
                        <TextInput
                            editable
                            maxLength={40}
                            onChangeText={setName}
                            value={stationName}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.lineTextAndInput}>
                        <Entypo name="price-tag" size={24} color="black"/>
                        <Text style={styles.label}> Price per Volt: </Text>
                        <TextInput
                            editable
                            keyboardType="number-pad"
                            maxLength={5}
                            onChangeText={setPrice}
                            value={pricePerVolt}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.lineTextAndInput}>
                        <Entypo name="battery" size={24} color="black"/>
                        <Text style={styles.label}> Type of Charger:</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={chargerType}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedValue(itemValue)
                            }
                        >
                            <Picker.Item label="Type 0" value="TYPE_0"/>
                            <Picker.Item label="Type 1" value="TYPE_1"/>
                        </Picker>
                    </View>
                    <View style={styles.buttons}>
                        <Buttons
                            on_press={() => {
                                updateChargingStation({
                                    latitude,
                                    longitude,
                                    pricePerVolt,
                                    chargerType,
                                    stationName,
                                });
                                navigation.navigate("Stations");
                            }}
                            btn_text={"Update Station"}
                        ></Buttons>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    fieldsContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: Dimensions.get('window').height * 0.4,
        top: 100

    },
    headerText: {
        fontSize: 25,
        fontWeight: "300",
        textAlign: 'center',
        top: 40
    },
    buttons: {
        bottom: -200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    smallText: {
        maxWidth: "50%",
        color: "#999",
        fontSize: 14,
        textAlign: "center",
        paddingTop: 10,
        fontWeight: 200
    },
    mainView: {
        flex: 1,
    },
    picker: {
        fontSize: 14,
        justifyContent: "center",
        flex: 1,
        height: 20,
    },
    input: {
        width: "40%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingLeft: 10,
    },
    lineTextAndInput: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        maxWidth: Dimensions.get('window').width - 100,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 300
    },
});

export default EditStation;
