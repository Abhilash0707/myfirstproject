import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Toast from 'react-native-toast-message';

// const employeeData = [
//   {id: '001', password: 'password1'},
//   {id: '002', password: 'password2'},
//   {id: '003', password: 'password3'},
//   {id: '004', password: 'password4'},
//   {id: '005', password: 'password5'},
// ];
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [token, setToken] = useState('');

  const showToasterror = () => {
    Toast.show({
      type: 'error',
      text1: 'Please Fill the required Credentials correctly',
      // text2: "And should not less than 7 char",

      visibilityTime: 2000,
    });
    console.log('hello');
  };

  // const validateLogin = () => {
  //    const employee = employeeData.find(emp => emp.id === employeeId && emp.password === password); {
  //     showToasterror();
  //     console.log('hiee');
  //     // alert('Employee ID and Password cannot be empty.');
  //   } else if (employeeId === '1111' && password === '1111') {
  //     // If valid, navigate to another screen (replace 'AnotherScreen' with your desired screen)
  //     navigation.navigate('menuScreen',{data:{employeeId}});
  //     setPassword('');
  //     setEmployeeId('');
  //     console.log("hiii");
  //   } else {
  //     // If not valid, show an alert or handle it as needed
  //     showToasterror();
  //   }
  // };
  useEffect(() => {
    // Check if employee ID is already stored in AsyncStorage
    retrieveEmployeeId();
    // apicall()
    // console.log(token,'ttkkn')
  }, []);

  const retrieveEmployeeId = async () => {
    try {
      const storedEmployeeId = await AsyncStorage.getItem('token');
      console.log(storedEmployeeId, 'ttkn abhi');
      if (storedEmployeeId != null) {
        // If employee ID is found, navigate to the other screen
        navigation.navigate('Drawernav');
        // Alert.alert('Token Retrived')
      } else {
        // Alert.alert('Null Token')
      }
    } catch (error) {
      console.error('Error retrieving Token:', error);
    }
  };
  const handleLogin = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/auth/login',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            requestType: 'mobile',
          }),
        },
      );

      const json = await response.json();
      // console.log(json,'jsonnnnn');
      //  setToken(json.access_token)
      //  console.log(token)

      if (json.status === 1) {
        console.log(json, 'lll');
        console.log(json.access_token, 'token');
   

        let asynctoken = await AsyncStorage.setItem('token', json.access_token);

        navigation.navigate('Drawernav');
        console.log(asynctoken, 'asynctoken--------------');
        setEmail('');
        setPassword('');
      } else {
        // Alert.alert(json.message)
        // Alert.alert('denied');
        showToasterror();
      }
    } catch (error) {
      console.error('Error storing Tokan:', error);
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        {/* <Toast /> */}
        <View style={{flex: 1, alignSelf: 'center'}}>
          <Image
            style={{
              height: 550,
              width: 450,
              alignSelf: 'center',
              // marginBottom: 15,
              // marginRight: 20,
              // alignSelf: 'center',
              // marginTop: 70,
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
              // borderRadius:50,
              // borderWidth:2,
              // borderColor:'black'
            }}
            // resizeMode="stretch"
            source={require('../../Assects/Images/hangers.jpg')}
          />
        </View>
        <View style={styles.modalView}>
          <View style={{marginBottom: 40}}>
            <Text
              style={{
                fontStyle: 'italic',
                fontWeight: '600',
                fontSize: 35,
                alignSelf: 'center',
                color: '#FF5900',
              }}>
              Dafodill
            </Text>
            <Text
              style={{
                fontStyle: 'italic',
                fontWeight: '500',
                fontSize: 18,
                alignSelf: 'center',
                color: 'black',
              }}>
              Your Urban Classic Store
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: '#FF5900',
                width: '70%',
                alignSelf: 'center',
                marginTop: 30,
                borderRadius: 7,
                height: 40,
                justifyContent: 'center',
                // borderWidth: 1,
                // borderColor: 'black',
                // borderBottomWidth: 2,
              }}>
              <Text
                style={{
                  // fontStyle: 'italic',
                  fontWeight: '500',
                  fontSize: 18,
                  alignSelf: 'center',
                  color: 'black',
                }}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                Don't have an account?
              </Text>
              <TouchableOpacity>
                <Text
                  style={{color: '#FF5900', fontWeight: '500', fontSize: 19}}
                  onPress={() => navigation.navigate('signup')}>
                  {' '}
                  Sign Up here!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <LinearGradient
        colors={['#80ADEA', '#7DD156']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.gradient}> */}

        {/* </LinearGradient> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  gradient: {
    flex: 1,
  },
  input: {
    height: 44,
    borderColor: 'gray',
    // borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '70%',
    alignSelf: 'center',
    borderColor: 'orange',
    borderRadius: 7,
    backgroundColor: 'white',
    fontWeight: '600',
    fontSize: 16,
    backgroundColor: '#E4E2E1',
  },
  modalView: {
    // margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 400,
    // height: 400,
    justifyContent: 'center',
    // padding: 35,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
    top: Dimensions.get('window').height / 2 - 50,
  },
});
