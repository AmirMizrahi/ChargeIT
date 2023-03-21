import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Button, Input} from "react-native-elements";
import basicApi from "../api/basicApi";
import {logger} from "react-native-logs";

const LoginScreen = () => {
    const log = logger.createLogger();

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const login = async () => {

        try{
            log.debug(`Username=${userName} trying to login.`);
            const response = await basicApi.post('/users/login',
                {userName,password})
            log.debug(`Received code ${response.status}. Successfully registered Username=${userName}.`);
            log.debug(response.data);
        }
        catch (e) {
            log.error("Something went wrong :(");
            log.error(e);
        }
    }

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
                onPress={() => login ({userName, password})}/>
    </View>
    );
};

const styles = StyleSheet.create({});

export default LoginScreen;