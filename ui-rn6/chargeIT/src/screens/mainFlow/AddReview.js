import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import Buttons from '../../components/Buttons';
import StarRating from 'react-native-star-rating-widget';
import { Context as ReviewsContext } from '../../context/ReviewsContext';
import ErrorText from '../../components/ErrorText';

const AddReview = ({ navigation, route }) => {
    const { result } = route.params;

    const [grade, setGrade] = useState(1);
    const [nickname, onChangeNickname] = React.useState();
    const [review, onChangeReview] = React.useState();
    const [errorMessage, setErrorMessage] = React.useState();
    const [isReviewFilled, setIsReviewFilled] = React.useState(false);

    const { addReview } = useContext(ReviewsContext);

    const handleAddReview = () => {
        if (!review || review.trim() === '') {
            setErrorMessage('Please provide a review');
            return;
        }

        // Go to logic.
        addReview({
            grade,
            review,
            chargingStationId: result.id,
            nickname: nickname ? nickname : 'Anonymous',
        });

        // Reset error message and clear the review input
        setErrorMessage('');
        setGrade(1);
        onChangeNickname(null);
        onChangeReview('');
        setIsReviewFilled(false);

        Alert.alert("Thank You", "Your review was registered.", [
            {text: "OK"},
        ]);

        navigation.navigate("TabNavigator", {screen: "UserProfile"});

    };

    return (
        <View>
            <View>
                <Text>
                    Thanks you for using {result.stationName}. Your payment is: {result.payment}
                </Text>
                <Text>Want to help others and rank your experience with the station?</Text>
                <StarRating rating={grade} onChange={(newGrade) => setGrade(newGrade)} enableHalfStar={false} />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNickname}
                    value={nickname}
                    placeholder="Anonymous"
                    maxLength={15}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                        onChangeReview(text);
                        setIsReviewFilled(text.trim() !== ''); // Set isReviewFilled based on whether review is not empty
                    }}
                    value={review}
                    placeholder="Maximum of 200 letters."
                    maxLength={200}
                />
            </View>
            <View>
                <View style={styles.buttonView}>
                    <Buttons btn_text="Add Review" on_press={handleAddReview} />
                    <Buttons btn_text="Not interested" />
                    <ErrorText errorMessage={errorMessage} />
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