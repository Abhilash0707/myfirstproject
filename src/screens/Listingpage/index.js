import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../Component/Header';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const Listing = props => {
    const navigation = useNavigation();
    console.log(props.route.params, 'abh9999999999999999999999999');
    const [liked, setliked] = useState(false);
    const [listing, setListing] = useState([]);
    const [listingimage, setListingimage] = useState([]);


    const buynow = (itemss, index) => {
        console.log(itemss, 'itemss--->>')
        navigation.navigate('BuyNow',
            // ,{id:item.id,
            // title:item.title
            { item: itemss }
            // }

        );
    };
    useEffect(() => {
        apicall();
    }, []);

    const apicall = async () => {
        try {
            const response = await fetch(
                'http://192.168.10.189/Project-4/public/api/listing',
                {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        catId: props.route.params.item.id,
                    }),
                },
            );

            const json = await response.json();
            const myjsondata = json.data;
            //  .map((items)=>{return(items.product_name)})
            // console.log(myjsondata, 'one----->>>>');
            // json.data.map((item)=>{
            // })
            setListing(myjsondata);
        } catch (error) {
            console.error(error);
        } finally {
        }
    };


    return (
        <View style={styles.container}>

            <View style={styles.headercontainer}>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color="black"
                        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
                        onPress={() => navigation.goBack()}
                    />
                    <Text
                        style={{
                            fontSize: 22,
                            color: 'black',
                            fontWeight: 'bold',
                            marginLeft: 10,
                        }}>
                        {/* {props.route.params.title} */}
                        {props.route.params.item.category_name}

                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        width: '50%',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    <View>
                        <AntDesign
                            name="search1"
                            size={23}
                            color="black"
                            style={{ marginLeft: 50 }}
                        />
                    </View>

                    <View>
                        <AntDesign
                            name="hearto"
                            size={22}
                            color="black"
                        // onPress={showMenu}
                        // style={{
                        //   marginRight: 8,
                        // }}
                        />
                    </View>
                    <View>
                        <Feather
                            name="shopping-bag"
                            size={20}
                            color="black"
                        //   onPress={showMenu}
                        // style={{
                        //   marginRight: 8,
                        // }}
                        />
                    </View>
                </View>
            </View>

            <LinearGradient
                colors={['white', 'white']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradient}>
                <View style={{ marginLeft: 30 }}>
                    <FlatList
                        contentContainerStyle={{ gap: 10 }}
                        columnWrapperStyle={{ gap: 20 }}
                        numColumns={2}
                        data={listing}
                        renderItem={(itemss, index) => {
                            return (
                                <View
                                    style={{ alignItems: 'center', marginLeft: 0, width: '44%' }}>
                                    <View style={styles.NewArrivalproduct}>
                                        {liked ? (
                                            <View
                                                style={{
                                                    alignSelf: 'flex-end',
                                                    height: 27,
                                                    width: 27,
                                                    borderRadius: 27,
                                                    backgroundColor: '#FF5900',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <AntDesign
                                                    name="heart"
                                                    size={15}
                                                    color="white"
                                                    // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
                                                    onPress={() => {
                                                        // if (index) {
                                                        setliked(!liked);
                                                        // }
                                                        // console.log('pressed');
                                                    }}
                                                // style={{marginRight:10,marginVertical:10}}
                                                />
                                            </View>
                                        ) : (
                                            <View
                                                style={{
                                                    alignSelf: 'flex-end',
                                                    height: 27,
                                                    width: 27,
                                                    borderRadius: 27,
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <AntDesign
                                                    name="heart"
                                                    size={15}
                                                    color="#FF5900"
                                                    // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
                                                    // onPress={() => navigation.goBack()}
                                                    // style={{marginRight:10,marginVertical:10}}
                                                    onPress={() => {

                                                        setliked(!liked);

                                                        // console.log('pressed');
                                                    }}
                                                />
                                            </View>
                                        )}

                                        <TouchableOpacity onPress={() => buynow(itemss)}>
                                            <Image
                                                // source={require('../../Assects/Images/tshirt.png')}

                                                source={{ uri: itemss.item.images.small }}
                                                style={styles.NewArrivalproductimage}
                                            />

                                            {/* <FlatList
                         
                          data={nestedlist}
                          renderItem={nestedflatlist}
                          keyExtractor={(item, index) => index.toString()}
                          style={{alignSelf: 'center'}}
                        /> */}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ alignSelf: 'flex-start' }}>
                                        <View>
                                            <Text
                                                style={{
                                                    //  color: 'black',
                                                    fontSize: 18,
                                                    margin: '2%',
                                                    fontWeight: '500',
                                                }}>
                                                {itemss.item.product_name}
                                                {/* {console.log(
                            itemss.item.images[0],
                            'my controll--->>',
                          )} */}
                                            </Text>
                                        </View>
                                        <View style={styles.priceholder}>
                                            <Text
                                                style={{
                                                    // color: 'black',
                                                    fontSize: 16,
                                                    margin: '2%',
                                                    marginRight: 15,
                                                    fontWeight: '600',
                                                }}>
                                                {itemss.item.product_price}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}></FlatList>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Listing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    NewArrivalheader: {
        // alignSelf: 'center',
    },
    NewArrivalheadertext: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        // textDecorationLine: 'underline',
        marginVertical: 15,
    },
    NewArrivalproductcontainer: {
        flexDirection: 'row',
        // backgroundColor: 'pink',
        height: 400,
        // width: '98%',
        // justifyContent: 'space-around',
        alignSelf: 'center',
    },
    NewArrivalproduct: {
        width: '100%',
        backgroundColor: '#F0F0F0',
        marginVertical: 15,
        borderRadius: 10,
        padding: 5,
    },
    NewArrivalproductimage: {
        width: '80%',
        height: 180,
        alignSelf: 'center',
        // backgroundColor: 'red',
        // marginVertical: 15,
        borderRadius: 15,
    },
    priceholder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buynowbtn: {
        width: '60%',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderRadius: 7,
        marginVertical: '10%',
        backgroundColor: 'orange',
    },
    headercontainer: {
        flexDirection: 'row',
        // backgroundColor: '#D1FABD',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        // marginTop: 10,
        fontWeight: 'bold',
    },
});
