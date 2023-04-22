import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native";
import Spacer from "../../components/Spacer";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";

const RegistrationScreen = ({ navigation }) => {
    const { state, register } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.container}>
                    <Spacer>
                        <Text h3>Sign Up</Text>
                    </Spacer>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Spacer>
                        <Button
                            title="Sign Up"
                            onPress={() => register({ email, password })}
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
    input:{
        position:'relative',
        height:'100%',
        width:'90%',
        paddingLeft:20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 250,
    },
    contentContainerStyle: {
        paddingVertical: 150,
    },
});

export default RegistrationScreen;
