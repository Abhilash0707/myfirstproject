import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import drawerNavigator from '../../Assects/Images/Drawer';
import Header from '../../Component/Header';



const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Chicken Biriyani',
        //name: 'country',
        image: require('../../Assects/Images/biriyani.jpg')

    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        //name: 'country',
        image: require('../../Assects/Images/biriyani.jpg')
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        //name: 'country',
        image: require('../../Assects/Images/biriyani.jpg')
    },

    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        //name: 'country',
        image: require('../../Assects/Images/biriyani.jpg')
    },

    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        //name: 'country',
        image: require('../../Assects/Images/biriyani.jpg')
    },


];
const category = [

    {
        id: '1',
    },
    {
        id: '2',
    },
    {
        id: '3',
    },

    {
        id: '4',
    },

    {
        id: '5',
    },
    {
        id: '6',
    },
    {
        id: '7',
    },
];
const meal=[{
    id: '1',
    title: 'Lunch',
    //name: 'country',
    image: require('../../Assects/Images/breakfast.jpg')

},
{
    id: '2',
    title: 'Breakfast',
    //name: 'country',
    image: require('../../Assects/Images/lunch.jpg')

},
{
    id: '3',
    title: 'Breakfast',
    //name: 'country',
    image: require('../../Assects/Images/breakfast.jpg')

},
];

const Details = () => {
    const [isActive, setIsActive] = useState('');
    const navigation = useNavigation();
    const myItem = ({ item }) => (

        <View style={styles.item}>

            <Image
                style={styles.Popularimg}
                source={item.image}
            />
            <View>
                <Text style={styles.popularorderdetails}>Chicken Biriyani</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View><Text style={styles.popularorderdetails}>$60</Text></View>
                    <View><Text style={{ textDecorationLine: 'line-through', fontSize: 18, marginLeft: 7, fontWeight: 'bold' }}>$70</Text></View>

                </View>
                <View style={styles.btnview}>
                    <TouchableOpacity onPress={() => navigation.navigate('order')} style={styles.mybutton}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#C334F8',
                        }}>Order</Text>

                    </TouchableOpacity  >


                </View>

            </View>

        </View>
    );

    const pagination = ({ item, index }) => (
        <View style={{ marginLeft: 15, marginTop: 15 }}>
            <TouchableOpacity
                onPress={() => { setIsActive(index) }} 
                style={[styles.headerpaging1a, { backgroundColor: isActive === index ? '#C334F8' : 'white' }]}
            ><Text style={styles.num}>{item.id}</Text>
            </TouchableOpacity>
          


        </View>
        

    );

    const todaysmeal=({})=>(


        <View style={styles.imgbox}>

        <Image
            style={styles.tinyLogo}
            source={require('../../Assects/Images/breakfast.jpg')}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Breakfast</Text>
    </View>

    );

    return (
        <View style={styles.container}>

            <ScrollView>

                <Header />

                <View>
                    <Text style={{ fontSize: 20, color: '#C334F8', fontWeight: 'bold' }}>05-10(5days)November</Text>
                </View>

                <FlatList
                    horizontal
                    data={category}
                    renderItem={pagination}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.boxcontainer}>
                    <View >
                        <Text style={styles.meal}>Today's Meal</Text>
                    </View>
                    <View style={styles.boxcontainer1}>
                        <View style={styles.imgbox}>

                            <Image
                                style={styles.tinyLogo}
                                source={require('../../Assects/Images/breakfast.jpg')}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Breakfast</Text>
                        </View>
                        <View style={styles.imgbox}>

                            <Image
                                style={styles.tinyLogo}
                                source={require('../../Assects/Images/lunch.jpg')}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Lunch</Text>
                        </View>
                        <View style={styles.imgbox}>

                            <Image
                                style={styles.tinyLogo}
                                source={require('../../Assects/Images/breakfast.jpg')}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Breakfast</Text>
                        </View>

                    </View>
                </View>


                <View style={{ marginTop: 30 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10 }} >
                        <Text style={styles.meal}>Popular Now</Text>
                        <TouchableOpacity><Text style={{ textDecorationLine: 'underline' }}>See all</Text></TouchableOpacity>
                    </View>
                    <FlatList

                        data={DATA}
                        renderItem={myItem}
                        keyExtractor={item => item.id}
                    />
                </View>

            </ScrollView>



        </View>

    )
}


export default Details

const styles = StyleSheet.create({

    container: {
        flex: 1,


    },

    headercontainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '98%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },

    headerpaging: {
        // flex: 1,
        // backgroundColor: 'pink',
        width: '98%',
        justifyContent: 'space-between',
        padding: 10,
        // alignItems: 'center',
        // alignSelf: 'center',
        marginTop: 10,
    },
    headerpaging1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 25,
        //backgroundColor:'blue',
        textAlign: 'center',
        marginTop: 6,
        alignItems: 'center',
    },
    headerpaging1a: {
        // sbackgroundColor:'black',
        borderWidth: 3,
        borderRadius: 40,
        height: 40,
        width: 40,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 2,
        borderColor: '#C334F8',
        justifyContent: 'space-around',
        // marginRight:20
        // backgroundColor:'red'
    },
    num: {
        fontSize: 15,
        fontWeight: 'bold',

    },
    meal: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        marginLeft: 10
    },
    imgbox: {

        alignItems: 'center',
        width: 120,
        height: 120,
        borderWidth: 0,
        borderColor: '#000',
        borderRadius: 10,
        elevation: 20,
        shadowColor: '#52006A',
        backgroundColor: 'white',
        marginRight: 10
    },
    boxcontainer: {
        marginLeft: 10,
        justifyContent: 'space-between',
        marginTop: 30

    },
    boxcontainer1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 25

    },
    tinyLogo: {
        height: 60,
        width: 60,
        marginTop: 13,
    },
    popular: {
        marginTop: '40',
        justifyContent: 'space-between',
        alignItems: 'center',
        //alignSelf: 'center',
        flexDirection: 'row',


    },
    popularorder: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderWidth: 0,
        // borderColor: '#000',
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#52006A',
        height: 135,
        marginTop: 30




    },
    Popularimg: {
        height: 100,
        width: 100,
        borderRadius: 100

    },
    popularorderdetails: {
        //flexDirection:'row'
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
        marginRight: 15


    }, mybutton: {
        borderColor: '#C334F8',
        borderRadius: 30,
        borderWidth: 3,
        padding: 7,
        width: '70%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderWidth: 0,
        borderColor: '#000',
        borderRadius: 10,
        elevation: 20,
        shadowColor: '#52006A',
        height: 60,
        padding: 10,
        marginTop: 30


    }, item: {
        //backgroundColor: 'pink',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderWidth: 0,
        // borderColor: '#000',
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#52006A',
        height: 135,
        marginTop: 30

    },
    categotystyle: {
        backgroundColor: 'red',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between'

    }



})


