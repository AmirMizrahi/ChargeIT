import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Button, Input} from "react-native-elements";

const LoginScreen = () => {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    return (<View>
        <Text>Login Screen</Text>
            <Input
                label = "User Name"
                value={userName}
                onChangeText={setUserName}
            />
            <Input
                label= 'Password'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button
                title = "Login"
                /*onPress={() => signup ({email, password})}*//>
    </View>
    );
};

const styles = StyleSheet.create({});

export default LoginScreen;