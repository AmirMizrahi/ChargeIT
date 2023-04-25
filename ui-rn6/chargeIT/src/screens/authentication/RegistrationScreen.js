import React, {useState, useContext} from "react";
import {View, StyleSheet} from "react-native";
import {Text, TextInput, Button} from "react-native";
import Spacer from "../../components/Spacer";
import {KeyboardAvoidingView, ScrollView} from "react-native";
import {Context as AuthContext} from "../../context/AuthContext";
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = ({navigation}) => {
    const {state, register} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(state);
    return (
        <KeyboardAvoidingView>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.container}>
                    <Spacer>
                        <Text style={styles.headText}>Sign Up for ChargeIT!</Text>
                    </Spacer>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={"Enter Email"}
                    />
                    <Spacer></Spacer>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={"Enter Password"}
                    />
                    {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                    <Spacer>
                        <Button
                            style={styles.button}
                            title="Sign Up"
                            onPress={() => register({email, password})}
                        />
                    </Spacer>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

RegistrationScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    headText: {
        fontSize: 25,
        fontWeight: 'bold',
        position: 'relative'
    },
    input: {
        height: '30%',
        width: '90%',
        paddingLeft: 20,
        borderColor: 'black',
        borderWidth: 1,
        position: 'relative',
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft:15,
        marginTop: 15
    },
    container: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 20,
        marginTop: 20,
    },
    contentContainerStyle: {
        paddingVertical: 150,
    },
});

export default RegistrationScreen;
