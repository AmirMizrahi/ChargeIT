import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import {useRoute} from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Buttons from "../../components/Buttons";
import basicApi from "../../api/basicApi";

const EditProfile = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const route = useRoute();
    const {mail, firstName, lastName, phone, password} = route.params;

    useEffect(() => {
        debugger;
        setUserData({
            mail: mail,
            fname: firstName,
            lname: lastName,
            phone: phone,
            password: password
        });
    }, []); // Run only once on component mount

    const updateUser = async () => {
        console.log(userData);
        console.log(route.params);
        try {
            await basicApi.put("/users/updateUser" +
                "?email=" + (userData.mail ? userData.mail : "") +
                "&firstName=" + (userData.fname ? userData.fname : "") +
                "&lastName=" + (userData.lname ? userData.lname : "") +
                "&phoneNumber=" + (userData.phone ? userData.phone : "") +
                "&password=" + (userData.password ? userData.password : "")
            );
        }catch (err) {
            console.log(err);
        }
        navigation.navigate('UserProfile');
    }


    return (
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                    <View
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <MaterialCommunityIcons
                                name="camera"
                                size={35}
                                color="#fff"
                                style={{
                                    opacity: 0.7,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                    borderRadius: 10,
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={{marginTop: 10, fontSize: 18, fontWeight: "bold"}}>
                    {userData ? userData.fname : ""} {userData ? userData.lname : ""}
                </Text>
            </View>

            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={userData ? userData.fname : ""}
                    onChangeText={(txt) => setUserData({...userData, fname: txt})}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#666666"
                    value={userData ? userData.lname : ""}
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
                    returnKeyType={'next'}
                    autoCorrect={false}
                    value={userData ? userData.phone : ""}
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
                />
            </View>
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="New Password"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={userData ? userData.password : ""}
                    onChangeText={(txt) => setUserData({...userData, password: txt})}
                    style={styles.textInput}
                    secureTextEntry={true}
                />
            </View>
            <Buttons btn_text="Update" on_press={() => updateUser()}/>
        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
    },
    header: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#333333",
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: "#333333",
    },
});
