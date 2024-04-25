import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Payment_Page = () => {
  const generateHash = async e => {
    // console.log(e, 'eeeeeeee');
    // var hashStringWithoutSalt = e.hashString;
    // var hashName = e.hashName;
    let sucessData = new FormData();
    sucessData.append('request_type', 'get_success_data');
    // hashData.append('hashStringwithoutSalt', e.hashString);

    console.log(sucessData, 'sucessData');

    const storedEmployeeId = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/get-order-data ',
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${storedEmployeeId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sucessData),
        },
      );

      const json = await response.json();
      console.log(json, 'sucessData');

      if (json.status === 1) {
        console.log(json, 'sucessDatanMethod');
        // var hashValue = json.hashSHAStringwithSalt;
        // var result = {[hashName]: hashValue};
        // PayUBizSdk.hashGenerated(result);
      } else {
        console.log('cancled_hash');
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  useEffect(() => {
    // generateHash();
  }, []);

  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <View style={styles.headercontainer}>
        <AntDesign
          name="arrowleft"
          size={30}
          color="black"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 90,
            width:90,
            borderRadius: 100,
            backgroundColor: '#075AE4',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 60,
              color: 'white',
              alignSelf: 'center',
              justifyContent: 'space-around',
            }}>
            A
          </Text>
        </View>
        <View style={{marginLeft: 18}}>
          <Text style={{fontSize: 24, fontWeight: '600'}}>
            To Abhilash Mohanty
          </Text>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '400'}}>
            TransactionId:11965231025
          </Text>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '400'}}>
            Bank:HDFC
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 180,
        }}>
        <Text style={{fontSize: 40, color: 'black', fontWeight: '500'}}>
          {' '}
          Rs.1799
        </Text>
        <Text style={{fontSize: 24, color: 'black', fontWeight: 'normal'}}>
          Fees: Rs.17
        </Text>
        <View style={{flexDirection:'row'}}>
          <AntDesign
            name="checkcircle"
            size={30}
            color="green"
            // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
            //   onPress={() => navigation.goBack()}
          />
          <Text style={{fontSize:20,color:"black",fontWeight:"500",marginLeft:10}}>Paid</Text>
        </View>
        <View style={styles.cart}>
            <Text style={{fontSize:20,fontWeight:'500'}}>Abhilash Mohanty</Text>
        </View>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'normal'}}>
         {' '}
          12 April 2024 at 18:36
        </Text>
      </View>
    </View>
  );
};

export default Payment_Page;

const styles = StyleSheet.create({
    cart: {
        width: '60%',
        backgroundColor: 'powderblue',
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        // height: 250,
        // marginTop: 20,
        flexDirection: 'row',
        margin: 20,
        // borderWidth:1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
});
