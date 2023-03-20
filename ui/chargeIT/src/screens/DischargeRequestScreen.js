import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Button} from "react-native-elements";

const DischargeRequestScreen = ({navigation}) => {
    return (<View>
            <Text>Discharge Request Screen</Text>
            <Button title='Go To Home'
                    onPress={()=>navigation.navigate('loginFlow')}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default DischargeRequestScreen;