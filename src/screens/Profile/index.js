import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, TextInput,Alert,ScrollView } from 'react-native'
import { React, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';





const Profile = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleorderdetails, setModalVisibleorderdetails] = useState(false);
  const[currentpassword,SetCurrentpassword]=useState('');
  const[newpassword,SetNewpassword]=useState('');
  const[confirmpassword,SetConfirmpassword]=useState('');
  const[firstname,SetFirstname]=useState('');
  const[lastname,SetLastname]=useState('');
  const[city,SetCity]=useState('');
  const[address,SetAddress]=useState('');
  const[state,SetState]=useState('');
  const[country,SetCountry]=useState('');
  const[pincode,SetPincode]=useState('');
  const[mobile,SetMobile]=useState('');


  const apicall = async () => {
      const storedEmployeeId = await AsyncStorage.getItem('token');
      // console.log(storedEmployeeId);
      try {
        const response = await fetch(
          'http://192.168.10.189/Project-4/public/api/update-password',
          {
            method: 'post',
            headers: {
              Authorization: `Bearer ${storedEmployeeId}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              old_password:currentpassword,
              password:newpassword,
              password_confirmation:confirmpassword,
              
            }),

          },
        );
       
        // const respo=await response.json();
        console.log(await response.json());
      } catch (error) {
        console.error(error)
      } finally {
      }
      setModalVisible(!modalVisible)
      SetCurrentpassword('')
      SetNewpassword('')
      SetConfirmpassword('')
    };
   
  const logintoggle = () => {
    // navigation.navigate("login")
    Alert.alert(
      'LOGOUT',
      'Do you really want to logout',
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed')
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const storedEmployeeId = await AsyncStorage.getItem('token');
            try {
              const response = await fetch(
                'http://192.168.10.189/Project-4/public/api/auth/logout',
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
              navigation.navigate('login')
            } catch (error) {
              console.error(error)
            } finally {
            }
          }
        },
      ],
      { cancelable: false },
    );

  }
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
            first_name:firstname,
            last_name:lastname,
            city:city,
            address:address,
            state:state,
            country:country,
            pincode:pincode,
            mobile:mobile

            
          }),

        },
      );
     
      
      console.log(await response.json())
      // const respo=await response.json()
      // Alert.alert(await response.json() );
      // console.log(respo)
   
    
    } catch (error) {
      console.error(error)
    } finally {
    }
    
    setModalVisibleorderdetails(!modalVisibleorderdetails)
    SetFirstname('')
    SetLastname('')
    SetCity('')
    SetAddress('')
    SetState('')
    SetCountry('')
    SetPincode('')
    SetMobile('')
  };
 

  return (
    <View style={styles.conatiner}>
      <View style={styles.headercontainer}>
        <AntDesign
          name="arrowleft"
          size={30}
          color="black"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          onPress={() => navigation.goBack()}
        />
        <View style={{ marginLeft: 20 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }}>Profile</Text></View>

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>CURRENT PASSWORD</Text>
            <TextInput
            value={currentpassword}
            style={styles.cart1}
            onChangeText={text => SetCurrentpassword(text)}
          />
             <Text style={styles.modalText}> NEW PASSWORD</Text>
             <TextInput
            value={newpassword}
            style={styles.cart1}
            onChangeText={text => SetNewpassword(text)}
          />
             <Text style={styles.modalText}> CONFIRM PASSWORD</Text>
             <TextInput
            value={confirmpassword}
            style={styles.cart1}
            onChangeText={text => SetConfirmpassword(text)}
          />

          <TouchableOpacity style={styles.savebutton} 
           onPress={() => apicall()}
          >
            <Text style={{fontSize:18,alignSelf:'center',fontWeight:'600'}}>Save</Text>
          </TouchableOpacity>
           
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleorderdetails}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisibleorderdetails(!modalVisibleorderdetails);
        }}>
          <ScrollView>
          <View style={styles.centeredView}>
          <View style={styles.modalView1}>
          <Entypo
          name="squared-cross"
          size={30}
          color="black"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          onPress={() =>setModalVisibleorderdetails(!modalVisibleorderdetails)}
          style={{alignSelf:'flex-end'}}
        />
            <Text style={styles.modalText}>FIRST NAME</Text>
            <TextInput
            value={firstname}
            style={styles.cart1}
            onChangeText={text => SetFirstname(text)}
          />
           <Text style={styles.modalText}>LAST NAME</Text>
            <TextInput
            value={lastname}
            style={styles.cart1}
            onChangeText={text => SetLastname(text)}
          />
             <Text style={styles.modalText}> CITY</Text>
             <TextInput
            value={city}
            style={styles.cart1}
            onChangeText={text => SetCity(text)}
          />
             <Text style={styles.modalText}> ADDRESS</Text>
             <TextInput
            value={address}
            style={styles.cart1}
            onChangeText={text => SetAddress(text)}
            multiline={true}
          />
           <Text style={styles.modalText}>STATE</Text>
             <TextInput
            value={state}
            style={styles.cart1}
            onChangeText={text => SetState(text)}
          />
           <Text style={styles.modalText}>COUNTRY</Text>
             <TextInput
            value={country}
            style={styles.cart1}
            onChangeText={text => SetCountry(text)}
          />
          <Text style={styles.modalText}>PINCODE</Text>
             <TextInput
            value={pincode}
            style={styles.cart1}
            onChangeText={text => SetPincode(text)}
            keyboardType='numeric'
            maxLength={6}
          />
           <Text style={styles.modalText}>MOBILE</Text>
             <TextInput
            value={mobile}
            style={styles.cart1}
            onChangeText={text => SetMobile(text)}
            keyboardType='numeric'
            maxLength={10}
            
          />

          <TouchableOpacity style={styles.savebutton1} 
           onPress={() =>billing_address_apicall()}>
            <Text style={{fontSize:22,alignSelf:'center',fontWeight:'600'}}>Save</Text>
          </TouchableOpacity>
           
          </View>
        </View>
          </ScrollView>
      
      </Modal>


      <View>
        <Image
          style={{ height: 120, width: 120, marginTop: 40, borderRadius: 120, alignSelf: 'center' }}
          // source={require('')}
          source={require('../../Assects/Images/profile.png')}
        />
      </View>
      <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 22, fontWeight: '600' }}>Abhilash Mohanty</Text>
      <TouchableOpacity style={styles.cart1}
        onPress={() => setModalVisible(!modalVisible)} >
        <MaterialIcons
          name="password"
          size={28}
        // color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}

        />

        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 20 }}>CHANGE PASSWORD</Text>

      </TouchableOpacity>
      <View  >
      <TouchableOpacity style={styles.cart1}
        onPress={() => setModalVisibleorderdetails(!modalVisibleorderdetails)}
         >
        <FontAwesome
          name="first-order"
          size={28}
        // color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}

        />

        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 20 }}>BILLING ADDRESS</Text>

      </TouchableOpacity>
      </View>
      <View style={styles.cart1} ></View>
      <View style={styles.cart1} ></View>
      {/* <View style={styles.cart1} ></View> */}
      <TouchableOpacity style={styles.addtocart}
        onPress={() => logintoggle()}
      >
        <Text style={styles.addtocarttext}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  headercontainer: {
    flexDirection: 'row',
    // backgroundColor: '#D1FABD',
    width: '100%',
    // justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1
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
  cart1: {
    width: '85%',
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
    justifyContent: "center"
  },
  addtocart: {
    width: '40%',
    marginTop: 20,
    backgroundColor: '#FF5900',
    height: 50,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
    alignSelf: 'center'
  },
  addtocarttext: {
    alignSelf: 'center',
    fontWeight: '500',
    color: 'white',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // opacity:.1
    // transparent:true,

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
    width: "80%",
    // height: "45%"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop:15
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
    fontSize:18,
    color:'black',
    // margin:5,
    fontWeight:'600'
  },
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    // padding: 10,
    width:'100%',
    borderRadius:10,
    marginTop:12,
    // borderBottomWidth:2
    marginBottom:10
  },
  savebutton:{
    width:'40%',
    borderWidth:1,
    // padding:10,
    height:30,
    elevation:2,
    shadowOffset:0.1

  },
  savebutton1:{
    width:'60%',
    borderWidth:1,
    // padding:10,
    height:40,
    elevation:2,
    // shadowOffset:0.1,
    justifyContent:'center',
    marginTop:11

  },
  modalView1: {
    // margin: 20,
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
    width: "100%",
    height: "100%",
    // flex:1
  },
})