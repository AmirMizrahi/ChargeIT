import React, {useEffect, useState} from "react";
import {View, Text, TextInput, StyleSheet, Platform} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRoute} from "@react-navigation/native";
import {formatCardNumber, updateUser} from "../../hooks/userUtils";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Buttons from "../../components/Buttons";
import basicApi from "../../api/basicApi";

const AfterRegistrationDetailsCompletion = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const route = useRoute();
    const {email} = route.params;

    // Param from registration screen
    useEffect(() => {
        setUserData({
            mail: email
        });
    }, []); // Run only once on component mount

    return (
        <SafeAreaView style={styles.generalContainer}>

            <View style={styles.welcomeTextView}>
                <Text style={styles.helloWelcomeText}>Thanks for jumping in!</Text>
                <Text style={styles.secondaryText}>Were happy to have you on ChargeIT.{"\n"}
                    Interested in completing your registration? </Text>
            </View>

            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(txt) => setUserData({...userData, fname: txt})}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#666666"
                    onChangeText={(txt) => setUserData({...userData, lname: txt})}
                    autoCorrect={false}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Feather name="phone" color="#333333" size={20}/>
                <TextInput
                    placeholder="Phone"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                    maxLength={10}
                    returnKeyType={'next'}
                    autoCorrect={false}
                    onChangeText={(txt) => setUserData({...userData, phone: txt})}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Feather name="mail" color="#333333" size={20}/>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={userData ? userData.mail : ""}
                    onChangeText={(txt) => setUserData({...userData, mail: txt})}
                    style={styles.textInput}
                    editable={false}
                />
            </View>
            <View style={styles.paymentView}>
                <Text style={styles.paymentText}>Payment option:</Text>
                <View style={styles.action}>
                    <Feather name="credit-card" color="#333333" size={20}/>
                    <TextInput
                        placeholder="Credit Number"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(input) => formatCardNumber(input, setUserData, setFormattedCardNumber)}
                        value={formattedCardNumber}
                        maxLength={19}
                        keyboardType={"number-pad"}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="calendar" color="#333333" size={20}/>
                    <TextInput
                        placeholder="MM"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(txt) => setUserData({...userData, creditMonth: txt})}
                        maxLength={2}
                        keyboardType={"number-pad"}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="YY"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(txt) => setUserData({...userData, creditYear: txt})}
                        maxLength={2}
                        keyboardType={"number-pad"}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="CVV"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(txt) => setUserData({...userData, cvv: txt})}
                        maxLength={3}
                        keyboardType={"number-pad"}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="edit" color="#333333" size={20}/>
                    <TextInput
                        placeholder="ID Number"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(txt) => setUserData({...userData, idNumber: txt})}
                        maxLength={9}
                        keyboardType={"number-pad"}
                        style={styles.textInput}
                    />
                </View>
            </View>
            <View style={styles.buttonView}>
                <Buttons btn_text="Finish my Profile"
                         on_press={() => updateUser(userData, navigation)}/>
                <Buttons btn_text="Maybe later..."
                         on_press={() => navigation.navigate("DrawerNavigator", {screen: "TabNavigator"})}/>
            </View>
        </SafeAreaView>
    );
};

export default AfterRegistrationDetailsCompletion;

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        margin: 20
    },
    welcomeTextView: {
        marginBottom: 50,
        alignItems: "center",
    },
    helloWelcomeText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    secondaryText: {
        marginTop: 15,
        fontSize: 16,
        textAlign: "center"
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        justifyContent:'space-between',
        paddingHorizontal:15,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    paymentView: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    paymentText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    textInput: {
        fontSize: 20,
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: "#333333",
    },
});