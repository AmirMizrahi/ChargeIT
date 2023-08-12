import {Text, View, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';
import React from "react";

const StationReviewCard = ({details}) => {
    return (
        <View style={styles.container}>
            <View style={styles.nameAndImage}>
                <MaterialCommunityIcons name="face-man" size={24} color="black"/>
                <Text style={styles.name}>{details.name}</Text>
            </View>
            <StarRating starSize={20} rating={details.grade} onChange={(newGrade) => null} />
            <Text>{details.text}</Text>
            <Text style={styles.date}>{details.dateTime}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10
    },
    name: {
        fontWeight: "bold",
        marginLeft: 5
    },
    nameAndImage: {
        flexDirection:'row',
    },
    date: {
        fontStyle:'italic',
        color:'gray'
    }
});

export default StationReviewCard;
