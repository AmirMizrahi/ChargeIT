import React from 'react';
import {View, Text, StyleSheet, TextInput} from "react-native";
import Buttons from "../../components/Buttons";
import {updateUser} from "../../hooks/userUtils";

const AddReview = ({route}) => {
    const {result} = route.params;
    const [review, onChangeReview] = React.useState();

    return (
        <View>
            <View>
                <Text>Thanks you for using {result.stationName}. Your payment is: {result.payment}</Text>
                <Text>Want to help others and rank your experience with the station?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeReview}
                    value={review}
                    placeholder="Maximum of 200 letters."
                    maxLength={200}
                />
            </View>
            <View>
                <View style={styles.buttonView}>
                    <Buttons btn_text="Add Review" />
                             {/*// on_press={() => updateUser(userData, navigation)}/>*/}
                    <Buttons btn_text="Not intersted"/>
                             {/*// on_press={() => navigation.navigate("DrawerNavigator", {screen: "TabNavigator"})}/>*/}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default AddReview;
