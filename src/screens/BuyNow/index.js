import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert
} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Component/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BuyNow = props => {
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState('');
  const [param, setParam] = useState([]);
  const [paramimage, setParamimage] = useState([]);
  console.log(props.route.params, '55555555555555555555');
  const [radiobtn, setRadiobtn] = useState(true);
  const [responsedata, setResponsedata] = useState('');
  const [productsize, setProductsize] = useState([])
  const [productdetails, setProductdetails] = useState('')
  const [size, setSize] = useState('')
  const [productid, setProductid] = useState('')
  const [sizearr,SetSizearr]=useState([]);

  // console.log(param,'param');





  // useEffect(() => {
  //   setTimeout(() => {
  //     setplus(plus);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    apicall()
    // detailapicall()
    // sizeapicall()

  }, []);

  const apicall = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/details',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: props.route.params.item.item.id,
          }),

        },
      );

      const json = await response.json();

      if (json.status === 1) {
        // setParam(json.data)
        // console.log(json.data.attributes,'response--------------------aa')
        let sizearray=[];
        json.data.attributes.map((item, index) => {
          // console.log(item.size,'response----attributes11')
         
          sizearray.push(item.size);
        })
          SetSizearr(sizearray);


        setProductid(json.data.id)
        // setParam(json.id)
        setParam(json)
        setResponsedata(json.data)
        setProductdetails(json.attributeDetail.final_price)
        setProductsize(json.data.attributes)
        setParamimage(json.data.images)
        setRadiobtn(!radiobtn)
      } else {
        Alert.alert(json.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
    }
  };
  // const detailapicall = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://192.168.10.189/Project-4/public/api/details',
  //       {
  //         method: 'post',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           productId: props.route.params.item.brand_id,
  //         }),

  //       },
  //     );

  //     const json = await response.json();
  //     console.log(json.data.images.small);

  //     if (json.status === 1) {
  //       // setParam(json.data)
  //       // console.log(json,'response--------------------aa')
  //       setProductid(json.data.id)
  //       // setParam(json.id)
  //       setParam(json)
  //       setResponsedata(json.data)
  //       setProductdetails(json.attributeDetail.final_price)
  //       setProductsize(json.data.attributes)
  //       setParamimage(json.data.images)
  //       setRadiobtn(!radiobtn)
  //     } else {
  //       Alert.alert(json.message)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //   }
  // };

  const sizeapicall = async (item) => {
    setSize(item.size)
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/details',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: props.route.params.item.item.id,
            // productId: 4,
            size: item.size
          }),

        },
      );

      const json = await response.json();
      // const myjsondata = json.data;

      if (json.status === 1) {
        setProductdetails(json.attributeDetail.final_price)
        setResponsedata(json.data)
        setProductsize(json.data.attributes)
        setParamimage(json.data.images)
       
        setRadiobtn(!radiobtn)
      } else {
        Alert.alert(json.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
    }
  };


  const pagination = ({ item, index }) => {
    console.log(item,'---->>>')
    return (
      <View style={{ marginLeft: 15, marginTop: 15 }}>
        <TouchableOpacity
          onPress={() => {
            setIsActive(index)
            sizeapicall(item)
            //  setProductdetails('')
          }}
          style={[
            styles.headerpaging1a,
            { backgroundColor: isActive === index ? 'black' : 'white' },
          ]}>
          <Text
            style={[styles.num, { color: isActive === index ? 'white' : 'black' }]}>
            {item.size}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const addtocartnav = async (param, size) => {
    console.log(size, 'param');
    if(size ==''){
      Alert.alert('Select a Size')
    }else{
      setProductid(param.data.id)
      try {
        const storedEmployeeId = await AsyncStorage.getItem('token');
        console.log(storedEmployeeId, '000000000000000000000000000000000');
  
        const response = await fetch(
          'http://192.168.10.189/Project-4/public/api/add-to-cart',
          {
            method: 'post',
            headers: {
              Authorization: `Bearer ${storedEmployeeId}`,
              Accept: 'application/json',
              'Content-Type': 'application/json'
              // Authorization: 'Bearer' + token
  
            },
            body: JSON.stringify({
              // productId: props.route.params.item.item.id,
              // productId: 4,
              cartProducts: JSON.stringify([{ "product_id": productid, "quantity": quantity, "size": size }])
  
            }),
  
          },
        );
  
        const json = await response.json();
        // console.log(json,'response--------------------add to cart')
  
  
        if (json.status === 1) {
          // setParam(json.data)
          navigation.navigate('Cart')
        } else {
          Alert.alert(json.message)
        }
      } catch (error) {
        console.error(error)
      } finally {
      }

    }
  
  };
  const add_to_wishlist = async (param,size) => {
    // console.log(param.data.id, 'param');
    // setProductid(param.data.id)
    if(size==''){
      Alert.alert('Select A size')
    }else{
      try {
        const storedEmployeeId = await AsyncStorage.getItem('token');
        // console.log(storedEmployeeId, '000000000000000000000000000000000');
  
        const response = await fetch(
          'http://192.168.10.189/Project-4/public/api/wishlist',
          {
            method: 'post',
            headers: {
              Authorization: `Bearer ${storedEmployeeId}`,
              Accept: 'application/json',
              'Content-Type': 'application/json'
              // Authorization: 'Bearer' + token
  
            },
            body: JSON.stringify({
              // productId: props.route.params.item.item.id,
              product_id: productid,
              request_type : 'add',
              size: size,
              request_from : 'app'
  
            }),
  
          },
        );
  
        const json = await response.json();
        console.log(json,'response--------------------add to wishlist')
  
  
        if (json.status === 1) {
          Alert.alert(json.message)
      
        } else {
          Alert.alert(json.message)
        }
      } catch (error) {
        console.error(error)
      } finally {
      }

    }
 
  };

  const plusquantity = () => (
    setQuantity(quantity + 1)
  )
  const minusquantity = () => {

    if (quantity > 1) {
      setQuantity(quantity - 1)

    }





  }





  console.log(sizearr, 'Sizearraryyyyyyyyyyyyyyyyyyyyyyyy');
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.headercontainer}>
        <AntDesign
          name="arrowleft"
          size={30}
          color="black"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          onPress={() => navigation.goBack()}
        />
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
        <View style={{ width: '98%', alignSelf: 'center' }}>
          <Image
            style={styles.Popularimg}
            // source={require('../../Assects/Images/tshirt.jpg')}
            source={{ uri: paramimage.small }}
          />
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={styles.detailsheading}>
              <View>
                <Text style={styles.popularorderdetails}>
                  {/* {param.product_name} */}
                  {responsedata.product_name}
                </Text>
                {/* <Text style={styles.popularorderdetails}>hr</Text> */}
              </View>

              <View>
                <Text style={styles.popularorderdetails1}>Rs.{productdetails}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.productdescription}>
                {responsedata.description}
              </Text>
              {/* <Text>...................................................................................</Text> */}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  marginTop: 10,
                  color: 'green',
                }}>
                In Stock
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  marginTop: 10,
                  // color: 'black',
                }}>
                Color: {responsedata.product_color}
              </Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>🖤🖤🖤🖤🖤</Text>
          </View>

          <View >
            <FlatList
              horizontal
              data={productsize}
              renderItem={pagination}
              keyExtractor={(item, index) => index.toString()}
            />

          </View>

          <View style={{ flexDirection: 'row', width: '90%', alignItems: "center", alignSelf: 'center', marginTop: 20, justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={{ height: 40, width: '30%', alignItems: "center", borderWidth: 1, justifyContent: 'center' }}
              onPress={() => plusquantity()}>
              {/* <Text style={{ fontSize: 25,color:'black' }}>++</Text> */}
              <AntDesign
                name="plus"
                size={25}
                color="black"
              />
            </TouchableOpacity>
            <View style={{ height: 40, width: '30%', alignItems: "center", borderWidth: 1 }}>
              <Text style={{ fontSize: 28, color: 'black' }}>{quantity}</Text>
            </View>
            <TouchableOpacity style={{ height: 40, width: '30%', alignItems: "center", borderWidth: 1, justifyContent: "center" }}

              onPress={() => minusquantity()}>
              {/* <Text style={{ fontSize: 28, color: 'black' }}>--</Text> */}
              <AntDesign
                name="minus"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>


          <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
            <TouchableOpacity style={styles.addtocart1} onPress={() => add_to_wishlist(param, size)}>
              <Text style={styles.addtocarttext}>Add To Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addtocart} onPress={() =>addtocartnav(param, size) }>
              <Text style={styles.addtocarttext}>Add To Cart</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
            <Text
              style={{
                fontSize: 24,
                color: 'black',
                fontWeight: '700',
                textDecorationLine: 'underline',
              }}>
              Simillar Products
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default BuyNow;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Popularimg: {
    height: 350,
    width: ' 94%',
    // borderRadius: 100,
    // marginTop: 30,
    resizeMode: 'stretch',
    alignSelf: 'center',
    borderRadius: 10,
  },
  detailsheading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'pink'
  },
  popularorderdetails: {
    //flexDirection:'row'
    fontWeight: '800',
    fontSize: 20,
    color: 'black',
    marginRight: 15,
    marginTop: 15,
  },
  popularorderdetails1: {
    fontWeight: '800',
    fontSize: 20,
    // color: 'black',
    marginRight: 15,
    marginTop: 15,
  },
  plusminus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusbtn: {
    // height:50,
    // width:50,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'pink'
  },
  btn: {
    height: 50,
    width: 50,
    backgroundColor: 'green',
  },
  productdescription: {
    fontWeight: '600',
    fontSize: 18,
    color: 'gray',
    marginRight: 15,
    marginTop: 15,
  },
  addtocart: {
    // borderWidth:1.5,
    alignSelf: 'center',
    // borderBlockColor:'black',
    width: '46%',
    // borderRadius: 30,
    marginTop: 20,
    backgroundColor: '#FF5900',
    height: 50,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  addtocart1: {
    // borderWidth:1.5,
    alignSelf: 'center',
    // borderBlockColor:'black',
    width: '46%',
    // borderRadius: 30,
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
  header: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
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
  headertext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#C334F8',
    fontStyle: 'italic',
  },
  headerpaging1a: {
    // sbackgroundColor:'black',
    borderWidth: 3,
    borderRadius: 10,
    height: 40,
    width: 100,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 2,
    borderColor: 'gray',
    justifyContent: 'space-around',
    // marginRight:20
    // backgroundColor:'red'
    marginLeft: 10
  },
  num: {
    fontSize: 15,
    fontWeight: '500',
  },
});
