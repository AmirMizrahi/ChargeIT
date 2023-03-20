import React from 'react';
import {StyleSheet} from "react-native";
import {Text,Input,Button} from 'react-native-elements'

const WelcomeScreen = ({navigation}) => {
    return (<>
            <Text>Hello world Screen</Text>
            <Button title='Register'
                    onPress={()=>navigation.navigate('Registration')}
            />
            <Button title='Login'
                    onPress={()=>navigation.navigate('Login')}
            />
            <Button title='Go To Charging Flow'
                    onPress={()=>navigation.navigate('chargingFlow')}
            />
        </>
    );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;