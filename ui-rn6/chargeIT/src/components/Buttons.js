import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

const Buttons = ({on_press,btn_text}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={on_press}>
            <Text style={styles.textStyle} >{btn_text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button :{
        justifyContent:'center',
        width:'95%',
        backgroundColor:"#465bd8",
        height:50,
        marginBottom:30,
        borderRadius:10
    },
    textStyle: {
        fontSize:15,
        letterSpacing:1.5,
        textAlign:'center',
        position:'relative',
        color:"white"
    }
})

export default Buttons