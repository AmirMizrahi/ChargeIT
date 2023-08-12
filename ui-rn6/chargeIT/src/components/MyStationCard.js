import {Text, View, StyleSheet, Button, Dimensions} from "react-native";
import {FontAwesome5} from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';
import React, {useState} from "react";
import Popup from "./Popup";
import QRCode from "react-native-qrcode-svg";
import MapView, {Marker} from "react-native-maps";

const MyStationCard = ({details, navigation}) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [mapPopupVisible, setMapPopupVisible] = useState(false);

    const openQRPopup = () => {
        setPopupVisible(true);
    };

    const closeQRPopup = () => {
        setPopupVisible(false);
    };

    const openMapPopup = () => {
        setMapPopupVisible(true);
    };

    const closeMapPopup = () => {
        setMapPopupVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.detailsContainer}>
                {/*Icon and name*/}
                <View style={styles.rowView}>
                    <FontAwesome5 name="charging-station" size={20} color="black"/>
                    <Text style={styles.name}>{details.name}</Text>
                </View>

                {/*Charging status*/}
                <View style={styles.rowView}>
                    <Text style={[
                        styles.regularText,
                        details.status === "CHARGING" ? {color: 'green', fontWeight: 'bold'} : null
                    ]}>
                        {
                            details.status === "CHARGING" ? "In use" : "Available"
                        }
                    </Text>
                </View>

                {/*Charging type*/}
                <View style={styles.rowView}>
                    <Text style={styles.regularText}>
                        {
                            details.type === "TYPE_0" ? "Type 0" : "Type 1"
                        }
                    </Text>
                </View>

                {/*Price*/}
                <View style={styles.rowView}>
                    <Text style={styles.regularText}>{details.price}₪ (per kWh)</Text>
                </View>

                {/*Rating - if no value, print message*/}
                <View style={styles.rowView}>
                    {
                        details.avgRat > 0 ?
                            <StarRating style={styles.regularText} starSize={17} rating={details.avgRat}
                                        onChange={(newGrade) => null}/>
                            : <Text style={styles.regularText}>No rating available.</Text>

                    }
                </View>
            </View>

            {/*Left panel Buttons*/}
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title={"Watch QR Code"} onPress={ openQRPopup }/>
                <Button style={styles.button} title={"Edit Station"} onPress={ () => navigation.navigate("EditStation", { stationId: details.id} )}/>
                <Button style={styles.button} title={"See Location"} onPress={ openMapPopup}/>
            </View>

            <Popup
                visible={popupVisible}
                onClose={closeQRPopup}
                navigation={null}
                txt = <QRCode value= {details.id} size={300}/>
                navigateTo={null}
            />

            <Popup
                visible={mapPopupVisible}
                onClose={closeMapPopup}
                navigation={null}
                txt = {<MapView
                    style={styles.map}
                    region={{longitude:details.location.longitude, latitude:details.location.latitude}}
                    initialRegion={{longitude:details.location.longitude, latitude:details.location.latitude, latitudeDelta: 0.001,
                        longitudeDelta: 0.001,}}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}>
                    <Marker coordinate={{
                        latitude: details.location.latitude,
                        longitude: details.location.longitude
                    }}/>
                </MapView>}
            navigateTo={null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: 250
    },
    mainContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        flexDirection: "row",
    },
    detailsContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    buttonContainer: {
        justifyContent: 'space-between',
        padding: 10,
    },
    name: {
        fontWeight: "bold",
        marginLeft: 10
    },
    regularText: {
        marginLeft: 33,
        fontSize:14
    },
    rowView: {
        flexDirection: 'row',
    },
    button: {
        marginBottom: 10,
        justifyContent: 'space-between',
    }
});

export default MyStationCard;