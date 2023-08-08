import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useIsFocused } from "@react-navigation/native";
import { Context as UsersContext } from "../../context/UsersContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Revenue = () => {
    const { state, getUserInfo } = useContext(UsersContext);
    const [tableData, setTableData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0); // Total amount state

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUserInfo();
                const profits = user.profits;

                const total = profits.reduce((sum, profit) => sum + profit.amount, 0);
                setTotalAmount(total);

                const tableRows = profits.map(profit => [profit.dateTime, profit.amount + "₪"]);
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
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>My Profits:</Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={['Date', 'Profit']} style={styles.head} textStyle={styles.text} />
                    <Rows data={tableData} textStyle={styles.text} />
                    <Row data={['Total', totalAmount]} style={styles.totalRow} textStyle={styles.text} />
                </Table>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 6
    },
    totalRow: {
        backgroundColor: '#f2f2f2'
    }
});

export default Revenue;