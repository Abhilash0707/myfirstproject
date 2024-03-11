import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      text1: 'Please Fill the required fields correctly',
      // text2: "And should not less than 7 char",

      visibilityTime: 2000,
    });
    // console.log("hello");
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
    retrieveEmployeeId()
    // apicall()
    // console.log(token,'ttkkn');
  }, []);

  const retrieveEmployeeId = async () => {
    try {
      const storedEmployeeId = await AsyncStorage.getItem('token');
      console.log(storedEmployeeId,'ttkn abhi');
      if (storedEmployeeId != null) {
        // If employee ID is found, navigate to the other screen
        navigation.navigate('Drawernav');
        // Alert.alert('Token Retrived')
      }else{
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

              email:email,
              password:password,
              requestType: 'mobile'
              
            }),
         
          },
        );
  
        const json = await response.json();
        console.log(json);
      //  setToken(json.access_token)
      //  console.log(token);
        
        
  
        if (json.status === 1) {
         
          console.log(json,"lll");
          console.log(json.access_token,'token');
          
          
           let asynctoken = await AsyncStorage.setItem('token',json.access_token);
           
          navigation.navigate('Drawernav');
          console.log( asynctoken,'asynctoken--------------');
  
  
      
        
        } else {
          // Alert.alert(json.message)
          Alert.alert('denied');
        }
      } catch (error) {
        console.error('Error storing Tokan:', error);
        
      }
    }
   
 

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#80ADEA', '#7DD156']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.gradient}>
        {/* <Toast /> */}
        <Image
          style={{
            height: 150,
            width: '78%',
            alignSelf: 'center',
            // marginBottom: 15,
            // marginRight: 20,
            alignSelf: 'center',
            marginTop: 70,
          }}
          resizeMode="contain"
          source={require('../../Assects/Images/logonew.png')}
        />
        <View style={{marginTop: 60}}>
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
              backgroundColor: '#7DD156',
              width: '35%',
              alignSelf: 'center',
              marginTop: 30,
              borderRadius: 7,
              height: 40,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'black',
              borderBottomWidth: 2,
            }}>
            <Text
              style={{
                fontStyle: 'italic',
                fontWeight: '800',
                fontSize: 20,
                alignSelf: 'center',
                color: 'black',
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignSelf:'center',marginTop:10}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>Don't have an account?</Text>
            <TouchableOpacity>
            <Text style={{color:'blue',fontWeight:'bold',fontSize:18}} onPress={()=>(navigation.navigate('signup'))}> Sign Up</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
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
