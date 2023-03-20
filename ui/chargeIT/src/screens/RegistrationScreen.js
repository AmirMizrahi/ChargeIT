import React, {useState} from 'react';
import {View, StyleSheet} from "react-native";
import {Text,Input,Button} from 'react-native-elements'
import basicApi from "../api/basicApi";

const RegistrationScreen = ({navigation}) => {
    const [userName,setUserName] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signup = async () => {
        try{
            console.log("trying to connect");
            const response = await basicApi.post('/users/registration', {email,password})
            console.log(`Received code ${response.status}`);
        }
        catch (e) {
            console.log("Something went wrong :(");
            console.log(e);
        }
    }

    return (
        <>
            <Text style = {{fontSize: 24}}>Registration: </Text>
            <Input
                label = "User Name"
                value={userName}
                onChangeText={setUserName}
            />
            <Input
                label = "First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <Input
                label = "Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <Input
                label = "Email"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                label = "Phone Number"
                value={phone}
                onChangeText={setPhone}
            />
            <Input
                label= 'Password'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button 
                title = "Signup"
                onPress={() => signup ({email, password})}/>
        </>
    );
};

const styles = StyleSheet.create({});

export default RegistrationScreen;