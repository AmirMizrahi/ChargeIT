import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {useIsFocused} from "@react-navigation/native";
import {Context as UsersContext} from "../../context/UsersContext";
import {SafeAreaView} from "react-native-safe-area-context";
import image from "../../assets/images/stations.jpg";

const Revenue = () => {
    const {state, getDeals} = useContext(UsersContext);
    const [tableData, setTableData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0); // Total amount state

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getDeals();
                const payments = user.payments;

                const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
                setTotalAmount(total);

                const tableRows = payments.map(payment => [payment.dateTime, payment.amount + "₪"]);
                setTableData(tableRows);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        if (isFocused) {
            fetchData();
        }

    }, [isFocused]);

    return (
        <SafeAreaView>
            <View>
                <Image style={{position: 'absolute', top: 0, left: 0}} source={image}/>
            </View>
            <ScrollView style={{padding: 10}}>
                <Text style={styles.title}>My Payments</Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={['Date', 'Profit']} style={styles.HeadStyle} textStyle={styles.HeadText}/>
                    <Rows data={tableData} textStyle={styles.text}/>
                    <Row data={['Total', totalAmount]} style={styles.totalRow} textStyle={styles.TableText}/>
                </Table>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        paddingTop: 35,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 25,
        fontWeight: "300",
        textAlign: 'center',
        paddingBottom: 20
    },
    HeadStyle: {
        height: 50,
        backgroundColor: '#465bd8',
    },
    HeadText: {
        margin: 10,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',

    },
    TableText: {
        textAlign: 'center',
        fontWeight: '200',
    },

    totalRow: {
        backgroundColor: '#f2f2f2'
    }
});

export default Revenue;