import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Button} from "react-native-elements";

const CreateStationScreen = ({navigation}) => {
    return (
        <>
            <Text>Create Station Screen</Text>
            <Button title='Go To Home'
                    onPress={()=>navigation.navigate('loginFlow')}
            />
        </>
    );
};

const styles = StyleSheet.create({});

export default CreateStationScreen;