import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { styles } from './styleSheet';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Component/Header';

const Order = () => {
    const [plus, setplus] = useState(0);
    //const [amount, setamount] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setplus((plus) => plus + 1);
        }, 1000);
    }, []);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header/>
            <Image
                style={styles.Popularimg}
                source={require('../../Assects/Images/biriyani.jpg')}
            />
            <View style={styles.detailsheading}>
                <View ><Text style={styles.popularorderdetails}>Chicken Biriyani</Text></View>
                <View><Text style={styles.popularorderdetails}>{plus * 60}</Text></View>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, color: 'black' }}>Details</Text>
            <View style={styles.plusminus}>
                <View style={styles.plusbtn}>
                    <Button
                        title="--"
                        style={styles.btn}
                        onPress={() => {
                            if (plus > 1) {
                                setplus(plus - 1);
                            } else {
                                navigation.navigate('details')
                            }

                        }}
                    />
                </View>
                <View style={styles.amount}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{plus}</Text>
                </View>
                <View style={styles.plusbtn} >
                    <Button
                        title="+"
                        onPress={() => {
                            setplus(plus + 1);
                            // setamount(amount + 60);
                        }}
                    />
                </View>
            </View>
        </View >
    )
}
export default Order;

