import {StyleSheet, Text, View, TextInput,TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Add_delivery_Address = () => {
  const [address, SetAddress] = useState('');
  const [firstname, SetFirstname] = useState('');
  const [lastname, SetLastname] = useState('');
  const [city, SetCity] = useState('');
  const [state, SetState] = useState('');
  const [country, SetCountry] = useState('');
  const [pincode, SetPincode] = useState('');
  const [mobile, SetMobile] = useState('');
  const navigation = useNavigation();
  
  const billing_address_apicall = async () => {
    const storedEmployeeId = await AsyncStorage.getItem('token');
    // console.log(storedEmployeeId);
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/post-address',
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${storedEmployeeId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstname,
            last_name: lastname,
            city: city,
            address: address,
            state: state,
            country: country,
            pincode: pincode,
            mobile: mobile,
          }),
        },
      );

     
      const respo=await response.json()
      // Alert.alert(await response.json() );
      console.log(respo.status)
      if(respo.status===1){
        Alert.alert('Address Added Sucess fully')
      }
      else{
        Alert.alert('Requirements did not Match')
      }

    } catch (error) {
      console.error(error);
    } finally {
    }

   
    SetFirstname('');
    SetLastname('');
    SetCity('');
    SetAddress('');
    SetState('');
    SetCountry('');
    SetPincode('');
    SetMobile('');
  };
  return (
    <View style={styles.container}>
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
            Add delivery Address
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{width: '49%'}}>
          <TextInput
            style={styles.input}
            placeholder="First Name(Required)*"
            //   placeholderTextColor="black"
            value={firstname}
            onChangeText={text => SetFirstname(text)}
          />
        </View>
        <View style={{width: '49%'}}>
          <TextInput
            style={styles.input}
            placeholder="Last name(Required)*"
            //   placeholderTextColor="black"
            value={lastname}
            onChangeText={text => SetLastname(text)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{width: '49%'}}>
          <TextInput
            style={styles.input}
            placeholder="State(Required)*"
            //   placeholderTextColor="black"
            value={state}
            onChangeText={text => SetState(text)}
          />
        </View>
        <View style={{width: '49%'}}>
          <TextInput
            style={styles.input}
            placeholder="City(Required)*"
            //   placeholderTextColor="black"
            value={city}
            onChangeText={text => SetCity(text)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        //   alignItems: 'center',
        }}>
        <View style={{width: '49%'}}>
          <TextInput
            style={styles.input}
            placeholder="Country(Required)*"
            //   placeholderTextColor="black"
            value={country}
            onChangeText={text => SetCountry(text)}
          />
        </View>
        <View style={{width: '49%'}}>
          <TextInput
            style={styles.input}
            placeholder="Pincode(Required)*"
            //   placeholderTextColor="black"
            value={pincode}
            onChangeText={text => SetPincode(text)}
          />
        </View>
      </View>
      <View
        style={{
         
          width: '105%',
          justifyContent: 'space-around',
        //   alignItems: 'center',
        alignSelf:'center'
        }}>
        <TextInput
          style={styles.input}
          placeholder="Mobile(Required)*"
          //   placeholderTextColor="black"
          value={mobile}
          onChangeText={text => SetMobile(text)}
        />
      </View>
      <View
        style={{
         
          width: '105%',
          justifyContent: 'space-around',
        //   alignItems: 'center',
        alignSelf:'center'
        }}>
        <TextInput
          style={styles.input}
          placeholder="Land Mark(Required)*"
          //   placeholderTextColor="black"
          value={address}
          onChangeText={text => SetAddress(text)}
        />
      </View>
      <TouchableOpacity
                style={styles.savebutton}
                onPress={() => billing_address_apicall()}>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: '500',
                    color: 'white',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
    </View>
  );
};

export default Add_delivery_Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#2778F3',
  },
  input: {
    // height: 44,
    marginTop: 15,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '90%',
    alignSelf: 'center',
    // borderColor: 'orange',
    // borderRadius: 7,
    // backgroundColor: 'white',
    fontWeight: '600',
    fontSize: 16,
    // backgroundColor: '#E4E2E1',
  },
  savebutton: {
    width: '85%',
    // borderWidth: 1,
    // padding:10,
    justifyContent: 'center',
    height: 35,
    // elevation: 2,
    // shadowOffset: 0.1,
    backgroundColor: '#FF5900',
    alignSelf:'center',
    
  },
});
