import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Cart = () => {
  const navigation = useNavigation();


  const [loader, setLoader] = useState(true);
  //const [amount, setamount] = useState('');
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);


  const apicall = async () => {
    const storedEmployeeId = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/cart',
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${storedEmployeeId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({
          //   productId: props.route.params.item.item.id,
          // }),

        },
      );

      const json = await response.json();
      // console.log(json.data.images, 'rrrrrrrrrrrrrrrrrrrrrrrrrr');
      setData(json.data);
      json.data.map((item) => {
        console.log(item.product.images, 'cart item-------');
        setTotal(total + item.product.product_price);
      })

      if (json.status === 1) {

      } else {
        Alert.alert(json.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
    }
  };
  const deleteapi = async (item) => {
    const storedEmployeeId = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/edit-cart',
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${storedEmployeeId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart_id: item.item.id,
          }),

        },
      );
      apicall()

     
    } catch (error) {
      console.error(error)
    } finally {
    }
    console.log(item.item.id,'deleteitem------------->>>>>...');
  };


  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000);
    apicall()

  }, []);

  const cartlist = (item, index) => {
    // console.log(item.item.size, "cartttt__item]]]]]]]]]]]");
    return (<View style={styles.cart1}>
      
      
       
      <View style={{ flexDirection: 'row', width: '65%' }}>
        <View style={{ height: 120, width: 120 }}>
          <Image
            style={{ height: 80, width: 80, marginTop: 10, marginLeft: 10 }}
            // source={require('../../Assects/Images/tshirt.jpg')}
            source={{ uri: item.item.product.images.Small }}
          />
        </View>
        <View style={{ width: '70%', marginTop: 10 }}>
          <Text style={{ fontSize: 16, color: 'black' }} numberOfLines={2} ellipsizeMode='tail'>{item.item.product.description}</Text>
          <Text
            style={{
              fontSize: 15,
              color: 'green',
              fontWeight: '500',
              marginTop: 7,
            }}>
            Size:  {item.item.size}
          </Text>
        </View>
      </View>
      <View style={{ width: '30%', marginTop: 10 }}>
        <Text style={{ alignSelf: 'flex-end', marginRight: 20, fontSize: 15, color: 'black' }}>{item.item.product.product_price}</Text>
        <Text style={{ alignSelf: 'flex-end', marginRight: 20, fontSize: 17, marginTop: 10 }}>* 1</Text>
        <Text style={{ alignSelf: 'flex-end', marginRight: 20, fontSize: 17, marginTop: 10, fontWeight: '800', color: 'green' }}>Rs.{item.item.product.product_price}</Text>
      </View>
      <View >
      <Entypo
            name="squared-cross"
            size={25}
            color="black"
            // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
            onPress={() => deleteapi(item)}
            
          />
      </View>
      
    </View>)
  }




console.log(total,'total Price');


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
            Cart
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
      <ScrollView>

        {loader ? (
          <FlatList

            data={[1, 1, 1, 1, 1, 1, 1]}
            renderItem={() => {
              return (
                <View
                  style={{
                    width: '90%',
                    height: 100,
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                  }}>
                  <ShimmerPlaceholder
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#9e9e9e',
                      opacity: 0.2,
                    }}></ShimmerPlaceholder>
                  <View style={{ width: '90%' }}>
                    <ShimmerPlaceholder
                      style={{
                        width: '70%',
                        height: 20,
                        backgroundColor: '#9e9e9e',
                        opacity: 0.2,
                        marginLeft: 10,
                      }}></ShimmerPlaceholder>
                    <ShimmerPlaceholder
                      style={{
                        width: '30%',
                        height: 20,
                        backgroundColor: '#9e9e9e',
                        opacity: 0.2,
                        marginLeft: 10,
                        marginTop: 20
                      }}></ShimmerPlaceholder>
                  </View>
                </View>
              );
            }}></FlatList>
        ) :
          <FlatList

            data={data}
            renderItem={cartlist}
            keyExtractor={(item, index) => index.toString()}
            style={{ alignSelf: 'center' }}
          />




        }
        <View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View><Text style={{marginLeft:10,color:'black',fontSize:17}}>price</Text></View>
            <View><Text style={{marginRight:10,color:'black',fontSize:17}}>RS.8555</Text></View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View><Text style={{marginLeft:10,color:'black',fontSize:17}}>Discount</Text></View>
            <View><Text style={{marginRight:10,color:'black',fontSize:17}}>-6555</Text></View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View><Text style={{marginLeft:10,color:'black',fontSize:17}}>Delivery charges</Text></View>
            <View><Text style={{marginRight:10,color:'black',fontSize:17}}> Free delivery</Text></View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View><Text style={{marginLeft:7,color:'black',fontSize:17}}> Total Amount</Text></View>
            <View><Text style={{marginRight:10,color:'black',fontSize:17}}>{total}</Text></View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.addtocart1} >
            <Text style={styles.addtocarttext}>Total</Text>
          </View>
          <TouchableOpacity style={styles.addtocart}
          //  onPress={()=>addtocartnav(param,size)}
          >
            <Text style={styles.addtocarttext}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
    width: '100%',
    borderColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
  headingtext: {
    fontSize: 22.5,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black',
  },
  cartholder: {
    flexDirection: 'row',
    // marginTop: 10,
  },
  Popularimg: {
    // height: 350,
    // width: ' 98%',
    // borderRadius: 100,
    marginTop: 10,
    // resizeMode: 'cover',
    // marginLeft: 15,
    borderRadius: 10,
    height: 160,
    width: 120,
    alignSelf: 'center',
  },
  detailsheading: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    //backgroundColor:'pink'
  },
  popularorderdetails: {
    //flexDirection:'row'
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
    // marginRight: 15,
    marginTop: 15,
  },
  plusminus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 10,
    shadowColor: 'black',
    alignSelf: 'center',
    width: '70%',
    marginTop: 9,
    backgroundColor: 'orange',
    borderWidth: 1.5,
    borderColor: 'grey',
    margin: 10,
  },
  plusbtn: {
    height: 40,
    width: '100%',
    // backgroundColor: 'pink',
    // backgroundColor: 'white',

    // borderRadius: 10,

    justifyContent: 'center',
  },
  amount: {
    // height: 50,
    // width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
    // width:'100%'
  },

  img: {
    width: '50%',
    // height:'90%',
    // backgroundColor: 'pink',
    // backgroundColor:'pink',
    // marginTop: 5,
    // marginLeft: 10,
    // borderWidth:1,
    // padding:10
  },
  cart: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    // height: 250,
    marginTop: 20,
  },
  cart1: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    // height: 250,
    // marginTop: 20,
    flexDirection: 'row',
    margin: 20,
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
  addtocart: {
    width: '50%',
    marginTop: 20,
    backgroundColor: '#FF5900',
    height: 50,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  addtocart1: {
    width: '50%',
    marginTop: 20,
    backgroundColor: 'black',
    height: 50,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  addtocarttext: {
    alignSelf: 'center',
    fontWeight: '500',
    color: 'white',
    fontSize: 20,
  },
});
