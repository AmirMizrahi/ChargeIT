import basicApi from "../api/basicApi";

export const formatCardNumber = (input, setUserData, setFormattedCardNumber) => {
    const digitsOnly = input.replace(/\D/g, '');
    const groups = digitsOnly.match(/(\d{1,4})/g);
    const formattedValue = groups ? groups.join(' ') : '';
    setUserData({cardNumber:digitsOnly});
    setFormattedCardNumber(formattedValue);
};

export const updateUser = async (userData, navigation, setErrorMessage) => {
    let expirationDate;

    // Card expiration date is MM/YY
    if (userData.creditMonth && userData.creditYear){
        expirationDate = userData.creditMonth + "/" + userData.creditYear;
    }

    const creditCardJson = {
        "cardNumber": (userData.cardNumber ? userData.cardNumber : ""),
        "expirationDate": expirationDate,
        "cvv": (userData.cvv ? userData.cvv : ""),
        "idNumber": (userData.idNumber ? userData.idNumber : "")
    }

    try {
        await basicApi.put("/users/updateUser" +
            "?email=" + (userData.mail ? userData.mail : "") +
            "&firstName=" + (userData.fname ? userData.fname : "") +
            "&lastName=" + (userData.lname ? userData.lname : "") +
            "&phoneNumber=" + (userData.phone ? userData.phone : "") +
            "&password=" + (userData.password ? userData.password : ""),
            creditCardJson
        );
    } catch (err) {
        setErrorMessage("Updated successfully. But: \n" + err.response.data.error);
    }

    // Navigate with 3 sec timeout
    setTimeout(() => navigation.navigate("TabNavigator", {screen: "UserProfile"}), 3000);
}