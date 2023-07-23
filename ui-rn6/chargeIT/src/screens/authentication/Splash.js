import React from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";

const Splash = ({navigation}) => {

    setTimeout(()=> {
        navigation.replace('Onboarding')
    }, 3000)

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={"light-content"}
                hidden={false}
                backgroundColor="#465bd8" //Where the clock is
            />
            <Image
                style={styles.logo}
                source={require("../../assets/images/blueChargeITLogo.jpeg")}
            />
            {/*<Text style={styles.title}>ChargeIT</Text>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#465bd8'
    },
    logo: {
        // width:50,
        // height:50,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    // title: {
    //     color:'white',
    //     fontSize:30,
    //    // fontFamily:"sans-serif-condensed"
    // }
})

export default Splash;
