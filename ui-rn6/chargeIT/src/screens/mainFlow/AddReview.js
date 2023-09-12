import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Dimensions, ImageBackground} from 'react-native';
import Buttons from '../../components/Buttons';
import StarRating from 'react-native-star-rating-widget';
import {Context as ReviewsContext} from '../../context/ReviewsContext';
import ErrorText from '../../components/ErrorText';
import image from "../../assets/images/app-background-new.jpg";
import Spacer from "../../components/Spacer";

const AddReview = ({navigation, route}) => {
    const {result} = route.params;

    const [grade, setGrade] = useState(1);
    const [nickname, onChangeNickname] = React.useState();
    const [review, onChangeReview] = React.useState();
    const [errorMessage, setErrorMessage] = React.useState();
    const [isReviewFilled, setIsReviewFilled] = React.useState(false);

    const {addReview} = useContext(ReviewsContext);

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


    const logo3 = require('./../../assets/images/logo4.jpeg')
    return (
        <View style={styles.mainView}>
            {/*<ImageBackground source={logo3} resizeMode="cover" style={styles.image}>*/}
            <View>
                <Text style={styles.text}>
                    Thank you for using {result.stationName}.{"\n"} Total to pay is: {result.payment}
                </Text>
                <Spacer></Spacer>
                <Text style={styles.headerText}>Tell us what you think!</Text>
            </View>
            <View style={styles.fieldsContainer}>

                <StarRating rating={grade} onChange={(newGrade) => setGrade(newGrade)} enableHalfStar={false}/>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNickname}
                    value={nickname}
                    placeholder="Your name"
                    maxLength={15}
                />
                <TextInput
                    style={styles.textarea}
                    onChangeText={(text) => {
                        onChangeReview(text);
                        setIsReviewFilled(text.trim() !== ''); // Set isReviewFilled based on whether review is not empty
                    }}
                    value={review}
                    placeholder="Your honest opinion"
                    maxLength={200}
                    editable={true}
                />
                <View style={styles.buttons}>
                    <Buttons btn_text="Add Review" on_press={handleAddReview}/>
                    <Buttons btn_text="Not interested" on_press={() => navigation.goBack()}/>
                    <ErrorText errorMessage={errorMessage}/>
                </View>
            </View>
            <View>

            </View>
            {/*</ImageBackground>*/}
        </View>
    );
};


const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    fieldsContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        // justifyContent: "space-between",
        alignItems: 'center',
        // maxHeight: Dimensions.get('window').height * 0.2,
        top: 70

    },
    headerText: {
        fontSize: 25,
        fontWeight: "300",
        textAlign: 'center',
        top: 40
    },
    text: {
        fontSize: 20,
        fontWeight: "300",
        textAlign: 'center',
        top: 40
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 300,
        marginTop:10
    },
    smallText: {
        fontSize: 14,
        fontWeight: 200
    },
    mainView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    picker: {
        fontSize: 14,
        justifyContent: "center",
        flex: 1,
        height: 20,
    },
    input: {
        width: "60%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
        margin: 20
    },
    textarea: {
        width: "80%",
        height: 100,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    lineTextAndInput: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        maxWidth: Dimensions.get('window').width - 100,
        alignItems: 'center'
    },
    label: {
        fontSize: 18,
        fontWeight: 300
    },
});

export default AddReview;