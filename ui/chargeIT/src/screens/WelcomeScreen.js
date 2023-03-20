import React from 'react';
import {StyleSheet} from "react-native";
import {Text,Input,Button} from 'react-native-elements'

const WelcomeScreen = ({navigation}) => {
    return (<>
            <Text>Hello world Screen</Text>
            <Button title='Register' onPress={()=>navigation.navigate('RegistrationScreen')}/>
        </>
    );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;