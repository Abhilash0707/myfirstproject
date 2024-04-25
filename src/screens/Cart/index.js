import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  NativeEventEmitter,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import PayUBizSdk from 'payu-non-seam-less-react';
import {sha512} from 'js-sha512';
import {TextInput} from 'react-native-gesture-handler';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Cart = () => {
  const navigation = useNavigation();

  const [loader, setLoader] = useState(true);
  //const [amount, setamount] = useState('');
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);
  const [responsedata, SetResponsedata] = useState([]);
  const [amount, SetAmount] = useState(0);
  const [placeorderdata, Setplaceorderdata] = useState();
  const [checkoutdata, SetCheckoutdata] = useState();
  const [address, SetAddress] = useState();
  const [radiobtn, setRadiobtn] = useState();
  const [refresh, setRefresh] = useState(false);
  const [addressChecked, setAddressChecked] = useState('');
  const [address_toggle_btn, Set_address_toggle_btn] = useState(false);
  const [modalVisible, SetModalVisible] = useState(false);
  const [midpauy, setMidpauy] = useState('');
  // const [item_id, Set_item_id] = useState();

  const [environmentTest, setEnvironmentTest] = useState('1');
  const [environmentProd, setEnvironmentProd] = useState('0');
  const eventEmitter = new NativeEventEmitter(PayUBizSdk);
  // useEffect(() => {
  //   const paymentSuccess = eventEmitter.addListener(
  //     'onPaymentSuccess',
  //     onPaymentSuccess,
  //   );
  //   const paymentFailure = eventEmitter.addListener(
  //     'onPaymentFailure',
  //     onPaymentFailure,
  //   );
  //   const paymentCancel = eventEmitter.addListener(
  //     'onPaymentCancel',
  //     onPaymentCancel,
  //   );
  //   const error = eventEmitter.addListener('onError', onError);
  //   const generateHashListener = eventEmitter.addListener(
  //     'generateHash',
  //     generateHash,
  //   );

  //   // Cleanup event listeners on component unmount
  //   return () => {
  //     paymentSuccess.remove();
  //     paymentFailure.remove();
  //     paymentCancel.remove();
  //     error.remove();
  //     generateHashListener.remove();
  //   };
  // }, []);
  const onPaymentSuccess = e => {
    // console.log(e.merchantResponse, 'merchantResponse');
    // console.log(e.payuResponse, 'payuResponse');
    checkForPayuSuccess(e.payuResponse);
    // this.props.navigation.replace('DrawerContainer');
  };
  const onPaymentFailure = e => {
    // console.log(e.merchantResponse, 'merchantResponse failure');
    // console.log(e.payuResponse, 'payuResponse failure');
    checkForPayuFailure(e.payuResponse);
    // this.props.navigation.replace('DrawerContainer');
  };
  const onPaymentCancel = e => {
    console.log('payment cancel-------------------------------->>');
  };

  // const generateHash = async e => {
  //   console.log(e, 'eeeeeeee');
  //   var hashStringWithoutSalt = e.hashString;
  //   var hashName = e.hashName;
  //   let hashData = new FormData();
  //   hashData.append('request_type', 'generate_hash');
  //   hashData.append('hashStringwithoutSalt', e.hashString);
  //   // console.log(midpauy,'payment_id');

  //   if (midpauy != undefined && midpauy !='') {
  //     hashData.append('payment_id', midpauy);
  //     console.log(midpauy,'payment_id_inside');
  //     // console.log(this.state.midpauy, "this.state.midpauy");
  //   }

  //   console.log(hashData, 'hashData');

  //   const storedEmployeeId = await AsyncStorage.getItem('token');
  //   try {
  //     const response = await fetch(
  //       'http://192.168.10.189/Project-4/public/api/generate-hash ',
  //       {
  //         method: 'post',
  //         headers: {
  //           Authorization: `Bearer ${storedEmployeeId}`,
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(hashData),
  //       },
  //     );

  //     const json = await response.json();
  //     console.log(json, 'generate_hash');

  //     if (json.status === 1) {
  //       console.log(json.hashSHAStringwithSalt, 'hashGenerationMethod');
  //       var hashValue = json.hashSHAStringwithSalt;
  //       var result = {[hashName]: hashValue};
  //       console.log(result,'result');
  //       PayUBizSdk.hashGenerated(result);
  //     } else {
  //       console.log('cancled_hash');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //   }

  //   //  props.hashGenerationMethod(hashData, (success, error, data) => {
  //   //       if (error) {
  //   //         // console.log('Error While getting Hash in server');
  //   //       } else {
  //   //         // console.log(data, 'hashGenerationMethod');
  //   //         var hashValue = data.hashSHAStringwithSalt;
  //   //         var result = {[hashName]: hashValue};
  //   //         PayUBizSdk.hashGenerated(result);
  //   //       }
  //   //     });
  // };
  const onError = e => {
    console.log(e, 'onError2');
  };

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
      console.log(json, 'rrrrrrrrrrrrrrrrrrrrrrrrrr');
      SetResponsedata(json.data);

      let modifiedArray = [];
      // let placeorderitem = {
      //   product_name: '',
      //   product_id: '',
      //   quantity: '',
      //   size: '',
      //   product_price: '',
      //   final_price: '',
      //   product_name: '',
      // };
      // console.log('clg item',json.data,"clg item")
      json.data.map(item => {
        // console.log(item.product.product_color, 'place_order_data');
        let placeorderitem = {
          product_id: item.product_id,
          quantity: item.quantity,
          size: item.size,
          product_price: item.product.product_price,
          final_price: item.product.final_price,
          product_name: item.product.product_name,
          color: item.product.product_color,
        };
        console.log(placeorderitem, 'placeorderitem');
        modifiedArray = [...modifiedArray, placeorderitem];
        // placeorderitem.push(item.product.product_name)

        // console.log(placeorderitem);
      });
      console.log(modifiedArray, 'HEY MODIFIED');
      Setplaceorderdata(modifiedArray);

      setData(json.data);
      json.data.map(item => {
        // console.log(item.quantity, 'cart item-------');
        // let price =0
        // let price_total=price+Number(item.product.product_price)
        setTotal(total + item.product.product_price);
        // console.log(price_total,'total_________Price');
      });

      if (json.status === 1) {
        // price_calculation();
      } else {
        Alert.alert(json.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const checkout = async () => {
    const storedEmployeeId = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/checkout ',
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${storedEmployeeId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coupon_id: '',
          }),
        },
      );

      const json = await response.json();
      console.log(json.data, 'checkout');
      SetCheckoutdata(json.data);
      // return(json)

      if (json.status === 1) {
        // price_calculation();
      } else {
        Alert.alert(json.message);
      }
      return json;
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const placeorder = async () => {
    const storedEmployeeId = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/place-order ',
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${storedEmployeeId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coupon_code: '',
            CartItems: JSON.stringify(placeorderdata),
            subtotal: Math.round(checkoutdata?.subtotal),
            discount: Math.round(checkoutdata?.discount),
            tax: Math.round(checkoutdata?.tax),
            shipping: Math.round(checkoutdata?.shipping),
            grandtotal: Math.round(checkoutdata?.grandtotal),
            billing_address_id: addressChecked.id,
            delivery_address_id: addressChecked.id,
            payment_gateway: 'hdfc',
            request_from: 'mob',
          }),
        },
      );

      const json = await response.json();
      console.log(json, 'place_orderrrrr');
      

      // return(json)

      if (json.status === 1) {
        // price_calculation();
        // createPaymentParams(json);
        // setMidpauy(json.data.merchantId);
        navigation.navigate('Payment_gateway', {
          item:json,midpauy:json.data.merchantId}) 
        console.log('hiiiiii');
      } else {
        Alert.alert(json.message);
      }
      return json;
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const deleteapi = async item => {
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
      apicall();
    } catch (error) {
      console.error(error);
    } finally {
    }
    // console.log(item.item.id, 'deleteitem------------->>>>>...');
  };
  const getaddressapi = async () => {
    const storedEmployeeId = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/get-addresses',
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${storedEmployeeId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({
          //   cart_id: item.item.id,
          // }),
        },
      );
      const json = await response.json();
      console.log(json, 'Addressssss------------->>>>>...');
      SetAddress(json.data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const toggleradiobtn = (item, index) => {
    console.log(item.id);
    console.log(index);
    setAddressChecked(item);
    console.log(item, 'addressChecked');
    // console.log(address[index].id,"address[index].id")
    // multiselect
    // if(item.id===address[index].id){
    //   if(address[index].checked)
    //   {
    //     address[index].checked=false;
    //   }else{
    //     address[index].checked=true;
    //   }
    // }
    SetModalVisible(false);
    setRefresh(!refresh);

    console.log(address, 'address checked');

    // let ratingdata = address;
    // console.log(radiobtn);
    // if (ratingdata[index].oncheck) {
    //   ratingdata[index].oncheck = false;
    //   SetAddress(ratingdata);
    //   setRadiobtn(!radiobtn);
    // } else {
    //   ratingdata[index].oncheck = true;
    //   SetAddress(ratingdata);
    //   setRadiobtn(!radiobtn);
    // }
    // if (addressindex === item.id) {
    //   Set_address_toggle_btn(!address_toggle_btn);
    //   Set_item_id(item.id)
    //   console.log('hiii');

    // }
  };
  console.log(address_toggle_btn, 'ppp');

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    apicall();
    checkout();
    getaddressapi();
  }, [addressChecked]);
  const checkbtn = index => {
    let filtercatdata = filtercat;
    // console.log(radiobtn);
    if (filtercatdata[index].oncheck) {
      filtercatdata[index].oncheck = false;
      setFiltercat(filtercatdata);
      setRadiobtn(!radiobtn);
    } else {
      filtercatdata[index].oncheck = true;
      setFiltercat(filtercatdata);
      setRadiobtn(!radiobtn);
    }
    // console.log(filtercat, 'abhi');
  };

  const cartlist = (item, index) => {
    // console.log(item.item.size, "cartttt__item]]]]]]]]]]]");
    return (
      <View style={styles.cart1}>
        <View style={{flexDirection: 'row',width:'65%'}}>
          <View style={{height: 120, width: 120}}>
            <Image
              style={{height: 80, width: 80, marginTop: 10, marginLeft: 10}}
              // source={require('../../Assects/Images/tshirt.jpg')}
              source={{uri: item.item.product.images.Small}}
            />
          </View>
          <View style={{width: '65%', marginTop: 10}}>
            <Text
              style={{fontSize: 16, color: 'black', fontWeight:'500'}}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.item.product.description}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: 'green',
                fontWeight: '500',
                marginTop: 7,
              }}>
              Size: {item.item.size}
            </Text>
          </View>
        </View>
        <View style={{width: '30%', marginTop: 10}}>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              fontSize: 15,
              color: 'black',
              fontWeight:'500'
            }}>
            Rs. {item.item.product.product_price}
          </Text>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              fontSize: 17,
              marginTop: 10,
              fontWeight:'500'
            }}>
            Qty : {item.item.quantity}
          </Text>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              fontSize: 17,
              marginTop: 10,
              fontWeight: '800',
              color: 'green',
            }}>
            Rs.
            {Number(item.item.quantity) *
              Number(item.item.product.product_price)}
          </Text>
        </View>
        <View style={{marginRight:0}}>
          <Entypo
            name="squared-cross"
            size={20}
            color="black"
            // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
            onPress={() => deleteapi(item)}
          />
        </View>
      </View>
    );
  };
  const price_calculation = () => {
    // console.log('called');
    let val = 0;
    responsedata.map(item => {
      val = val + Number(item.product.final_price) * Number(item.quantity);
      // console.log(item.quantity,"responseeee________DDDDData");
      // console.log(item.product.final_price,"responseeee________pppppppp");
      // console.log(Number(item.product.final_price)*Number(item.quantity),"responseeee________total");
      // let qnt=item.quantity
      // let price=item.product.final_price
      // SetAmount(Number(item.product.final_price)*Number(item.quantity))
    });
    // let total=amount;
    // let total_amount=(amount + amount)
    return val;
  };
  const createPaymentParams = json => {
    var txnid = new Date().getTime().toString();
    console.log(json, 'pppppkkkeyyyyy');
    // console.log('AutoSelectOtp: '+autoSelectOtp +'MerchantSmsPermission: '+merchantSMSPermission);
    var payUPaymentParams = {
      key: json.data.key,
      transactionId: txnid,
      amount: json.data.amount.toString(),
      // amount:"2355",
      productInfo: json.data.product_info,
      firstName: json.data.first_name,
      email: json.data.email,
      phone: json.data.phone,
      ios_surl: json.data.successUrl,
      ios_furl: json.data.failureUrl,
      android_surl: json.data.successUrl,
      android_furl: json.data.failureUrl,
      // environment: penvironment,
      environment:
        json.data.ENVIRONMENT == 'TEST' ? environmentTest : environmentProd,
      userCredential: json.data.key + ':' + json.data.email,
      additionalParam: {
        udf1: json.data.udf1.toString(),
        // udf1: '2',
        udf2: json.data.udf2,
        udf3: json.data.udf3,
        udf4: json.data.udf4,
        payment: json.data.hash,
        // udf5: udf5,
        // walletUrn: '100000',
      },
    };
    // var payUCheckoutProConfig = {
    //   // primaryColor: "#aabbcc",'rgb(233,169,69)'
    //   // secondaryColor: "<Color Hex Code e.g. #000000>",
    //   merchantName: 'OTDC',
    //   autoSelectOtp: true,
    //   merchantResponseTimeout: 5000,
    //   surePayCount: 0 - 3,
    //   // paymentModesOrder: [
    //   //   {UPI: 'TEZ'},
    //   //   {Wallets: 'PAYTM'},
    //   //   {Wallets: 'PHONEPE'},
    //   // ],
    //   paymentModesOrder: [
    //     {cards: ''},
    //     {'net banking': ''},
    //     {upi: ''},
    //     {wallets: ''},
    //     {emi: ''},
    //   ],
    // };

    var paymentObject = {
      payUPaymentParams: payUPaymentParams,
      // payUCheckoutProConfig is optional
      // Detail can be found in latter section
      // payUCheckoutProConfig: payUCheckoutProConfig,
    };

    console.log(paymentObject, 'paymentObject');
    PayUBizSdk.openCheckoutScreen(paymentObject);
    // PayUBizSdk.openCheckoutScreen(createPaymentParams());
  };

  // console.log(total,'total Price');
  const launchPayU = () => {
    // console.log('Method launched amount =' + amount);
    PayUBizSdk.openCheckoutScreen(createPaymentParams());
  };
  const addresslist = ({item, index}) => {
    // console.log(item, "Address__item]]]]]]]]]]]");
    // console.log(item,'iiiiiiiiiiiiiii');
    return (
      <TouchableOpacity
        style={{
          // alignSelf: 'center',
          marginTop: 20,
          marginBottom: 10,
          flexDirection: 'row',
          // justifyContent: 'center',
          // marginLeft:10
          // backgroundColor:'pink'
          // borderWidth:1,
          // height:100
        }}
        onPress={() => toggleradiobtn(item, index)}>
        <MaterialIcons
          name={
            addressChecked.id === item.id
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={22}
          color="#281E87"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}.
          style={{marginTop: 10, marginRight: 10}}
        />

        <Text style={{fontSize: 25}}>
          {item.address} , City: {item.city} , State: {item.state} , Pincode:{' '}
          {item.pincode}
        </Text>
      </TouchableOpacity>
    );
  };
  const viewaddress = () => {
    SetModalVisible(!modalVisible);
  };
  console.log(checkoutdata, 'checkout_data');

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={{flexDirection: 'row'}}>
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
              style={{marginLeft: 50}}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          SetModalVisible(!modalVisible);
        }}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalView}>
              <View
                style={{
                  // backgroundColor: '#FF5900',
                  // padding: 10,
                  borderBottomWidth: 1,
                  width: '100%',
                  flexDirection: 'row',
                  // justifyContent:'space-around'
                }}>
                <View>
                  <Entypo
                    name="squared-cross"
                    size={25}
                    color="black"
                    onPress={() => viewaddress()}
                    style={{
                      marginRight: 20,
                      marginTop: 3,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 22,
                    alignSelf: 'center',
                    fontWeight: '600',
                    color: 'black',
                  }}
                  onPress={() => viewaddress()}>
                  Select Delivery Address
                </Text>
              </View>

              {Array.isArray(address) && address.length ? (
                <FlatList
                  data={address}
                  renderItem={addresslist}
                  keyExtractor={(item, index) => index.toString()}
                  // style={{alignSelf: 'center'}}
                />
              ) : null}
            </View>
          </View>
        </ScrollView>

        {/* </View>
    </View> */}
      </Modal>
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
                  <View style={{width: '90%'}}>
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
                        marginTop: 20,
                      }}></ShimmerPlaceholder>
                  </View>
                </View>
              );
            }}></FlatList>
        ) : (
          <FlatList
            data={data}
            renderItem={cartlist}
            keyExtractor={(item, index) => index.toString()}
            style={{alignSelf: 'center'}}
          />
        )}

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30}}>Delivery Address</Text>
          <Text style={{fontSize: 20}}>
            {addressChecked.address} {addressChecked.city}{' '}
            {addressChecked.state} {addressChecked.pincode}{' '}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => viewaddress()}
          style={{
            alignSelf: 'center',
            width: '50%',
            alignItems: 'center',
            backgroundColor: 'orange',
            height: 32,
            justifyContent: 'center',
            margin: 10,
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Change Address
          </Text>
        </TouchableOpacity>
        {/* {Array.isArray(address) && address.length ? (
          <FlatList
            data={address}
            renderItem={addresslist}
            keyExtractor={(item, index) => index.toString()}
            // style={{alignSelf: 'center'}}
          />
        ) : null} */}
        <View style={{marginLeft: '3%', marginRight: '3%', marginTop: '3%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                Sub Total
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                RS. {Math.round(checkoutdata?.subtotal)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                Discount
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                RS. {checkoutdata?.discount}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                Delivery charges
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                RS. {Math.round(checkoutdata?.shipping)}{' '}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                {' '}
                Tax
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                RS. {Math.round(checkoutdata?.tax)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                {' '}
                Total Amount
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 600,
                }}>
                RS. {Math.round(checkoutdata?.grandtotal)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.addtocart1}>
            <Text style={styles.addtocarttext}>Total</Text>
          </View>
          <TouchableOpacity
            style={styles.addtocart}
            onPress={() => placeorder()}>
            <Text style={styles.addtocarttext}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
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
    // alignItems:'center',
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
  modalcontainer: {
    flex: 1,
    // height:'100%',
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundColor:'red',
    justifyContent: 'center',

    transparent: true,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    // height: "80%",
    justifyContent: 'center',
    alignContent: 'center',
  },
  input: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '70%',
    alignSelf: 'center',
    borderColor: 'orange',
    borderRadius: 7,
    backgroundColor: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
});
