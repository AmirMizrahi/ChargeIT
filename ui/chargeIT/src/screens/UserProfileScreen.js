import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Button} from "react-native-elements";

const UserProfileScreen = ({navigation}) => {
    return (<View>
            <Text>User profile Screen</Text>
            <Button title='Go To Home'
                    onPress={()=>navigation.navigate('loginFlow')}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default UserProfileScreen;