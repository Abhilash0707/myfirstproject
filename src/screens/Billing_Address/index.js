import { StyleSheet, Text, TouchableOpacity, View,ScrollView ,FlatList} from 'react-native'
import React from 'react'
import {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
const Billing_Address = () => {
  const [address, SetAddress] = useState();
  const [addressindex, SetAddressindex] = useState();
  const [addressChecked, setAddressChecked] = useState('');
  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  
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

    // SetModalVisible(false);
    setRefresh(!refresh);

    console.log(address, 'address checked');


  };
  const addresslist = ({item, index}) => {
    // console.log(item, "Address__item]]]]]]]]]]]");
    // console.log(item,'iiiiiiiiiiiiiii');
    return (
      <TouchableOpacity
      style={styles.modalView}
        onPress={() => toggleradiobtn(item, index)}>
        {/* <MaterialIcons
          name={
            addressChecked.id === item.id
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={22}
          color="#281E87"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}.
          style={{marginTop: 10, marginRight: 10}}
        /> */}
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{fontSize:25,fontWeight:"500",color:'black'}}> {item.first_name} {item.last_name}</Text>
        <TouchableOpacity>
        <Entypo
          name="dots-three-vertical"
          size={18}
          color="black"
          onPress={() => SetAddressindex(index)}
          style={{
            marginRight: 8,
            justifyContent:'flex-end'
          }}
        />
      </TouchableOpacity>

        </View>
        <Menu
          style={{ width: 150 }}
          visible={addressindex===index?true:false}
          // anchor={<Text>Show menu</Text>}
          onRequestClose={() => SetAddressindex(false)}>
          <MenuItem
            // onPress={() => {
            //   navigation.navigate('Profile')
            //   setVisible(false)
            // }}
            textStyle={styles.menutext}>
            Edit
          </MenuItem>
          {/* <MenuDivider /> */}
          <MenuItem
            // onPress={gotoNotifiation}
            textStyle={styles.menutext}>
            Remove
          </MenuItem>
          {/*  <MenuItem textStyle={styles.menutext}>
                {'Terms & Condition'}
              </MenuItem> */}
          
        </Menu>
        

        <Text style={{fontSize:16,marginTop:10,color:'black'}}>
          {item.address} , City: {item.city} , State: {item.state} , Pincode:{' '}
          {item.pincode}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    getaddressapi();
  }, [addressChecked]);
  console.log(addressindex,'setAddressss');
  return (
    <View style={styles.conatiner}>
      <View style={styles.headercontainer}>
        <AntDesign
          name="arrowleft"
          size={25}
          color="white"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          onPress={() => navigation.goBack()}
        />
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: '400'}}>
           My Address
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.headercontainer1}
      onPress={() => navigation.navigate('Add_delivery_Address')}
      >
        <Entypo
          name="plus"
          size={20}
          color="blue"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          
        />
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 18, color: 'blue', fontWeight: '400'}}>
           Add a new address
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.modalcontainer}>
            <View >
              <View
                style={{
                  // backgroundColor: '#FF5900',
                  // padding: 10,
                  // borderBottomWidth: 1,
                  width: '100%',
                  flexDirection: 'row',
                  // justifyContent:'space-around'
                }}>
             
                
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
    </View>
  )
}

export default Billing_Address

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  headercontainer: {
    flexDirection: 'row',
    backgroundColor: '#2778F3',
    width: '100%',
    // justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor:'#2778F3'
  },
  headercontainer1: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    // justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
    // borderBottomWidth: 1,
  },
  modalView: {
    // margin: 20,
    alignSelf:'center',
    marginTop:10,
    marginBottom:10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    // alignItems: 'center',
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
    // alignContent: 'center',
    // flexDirection:'row'
  },
})