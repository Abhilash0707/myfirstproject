import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
  Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

const Signup = () => {
  const navigation = useNavigation();
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [confirmpassword, SetconfirmPassword] = useState('');
  const [mobile, SetMobile] = useState('');

  const handleSignin = async () => {
    if (
      name != '' ||
      email != '' ||
      mobile != '' ||
      password != '' ||
      confirmpassword != ''
    ) {
      try {
        // await AsyncStorage.setItem('token', token);
        const response = await fetch(
          'http://192.168.10.189/Project-4/public/api/auth/register',
          {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // productId: props.route.params.item.item.id,
              // productId: 4,
              // email:{email},
              // password:{password}
              name: name,
              email: email,
              mobile: mobile,
              password: password,
              password_confirmation: confirmpassword,
              
              
            }),
          },
        );
        const json = await response.json();
      
        console.log(json);
    
        SetName('')
        SetEmail('')
        SetMobile('')
        SetPassword('')
        SetconfirmPassword('')
        //   if (json.status === 1) {
        //     Alert.alert('login Sucess');
        //     console.log(json);
        //     setToken(json.access_token)

        //   } else {
        //     // Alert.alert(json.message)
        //     Alert.alert('denied');
        //   }
      } catch (error) {
        console.error('Error storing Tokan:', error);
        // storeEmployeeId(token);
      }
    } else {
      Alert.alert('fill All the requirements');
    }
  };
  // useEffect(() => {
  //   apicall();
  // }, []);


  // const apicall=async()=>{

  //   const emailverification = await fetch(
  //     'http://192.168.10.189/Project-4/public/api/send-verify-email-link/' + {email},
  //     // {
  //     //   method: 'get',
  //     //   // headers: {
  //     //   //   Accept: 'application/json',
  //     //   //   'Content-Type': 'application/json',
  //     //   // },
  //     // },
  //   );

  //   // const json = await response.json();
  //   const emailver = await emailverification.json();
  //   // console.log(json);
  //   console.log(emailver,'email verification --------22');

  // }
  return (
    <ScrollView style={styles.container}>
      <View >
        <View style={styles.logincontainer}>
          <Text style={styles.text1}>Welcome To Sign Up</Text>
          <Text style={styles.text1a}>Fill out this Form to Sign up</Text>
        </View>
        <View style={styles.container1}>
          <View style={styles.headertext}>
            <Text style={styles.text2}> Name</Text>
          </View>
          <TextInput
            value={name}
            style={styles.text}
            onChangeText={text => SetName(text)}
          />
          <View style={styles.headertext}>
            <Text style={styles.text2}>Email</Text>
          </View>
          <TextInput
            style={styles.text}
            value={email}
            onChangeText={text => SetEmail(text)}
          />

          <View style={styles.headertext}>
            <Text style={styles.text2}>Mobile</Text>
          </View>
          <TextInput
            style={styles.text}
            maxLength={10}
            value={mobile}
            keyboardType="numeric"
            onChangeText={text => SetMobile(text)}
          />

          <View style={styles.headertext}>
            <Text style={styles.text2}>Password</Text>
          </View>
          <TextInput
            secureTextEntry={true}
            style={styles.text}
            value={password}
            onChangeText={text => SetPassword(text)}
          />

          <View style={styles.headertext}>
            <Text style={styles.text2}>ConfirmPassword</Text>
          </View>
          <TextInput
            style={styles.text}
            value={confirmpassword}
            onChangeText={text => SetconfirmPassword(text)}
          />

          <View style={styles.btnview}>
            <TouchableOpacity
              onPress={handleSignin}
              style={styles.mybutton}>
              <Text
                style={{
                  fontSize: 20,
                  // fontFamily: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
            <View style={{marginTop: 40, flexDirection: 'row'}}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.loginbtn}>Login here</Text>
              </TouchableOpacity>

              {/* <Text>Already have an account?
                <TouchableOpacity ><Text >Login</Text></TouchableOpacity>
                here
            </Text> */}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  logincontainer: {
    // marginTop: 60
    marginLeft: '5%',
  },

  container1: {
    // marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: 'red',

    width: '100%',
  },
  text: {
    fontSize: 14,
    color: '#BFC6D2',
    width: '85%',
    borderBottomColor: '#BFC6D2',
    borderBottomWidth: 2,
    fontWeight: '700',
  },
  text1: {
    fontSize: 30,
    //textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    marginLeft: '5%',
  },
  text1a: {
    //
    //textAlign: 'center',
    color: '#86888B',
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  text2: {
    fontSize: 15,
    // textAlign: 'center',
    color: 'black',
    // fontFamily: 'bold',
    // marginLeft: '20%',
    fontWeight: 'bold',
  },
  mybutton: {
    // fontSize:50,
    backgroundColor: '#6C88E7',
    // borderColor: '#2F8C78',
    borderRadius: 5,
    // borderWidth: 2,
    padding: 5,
    width: '80%',
    // marginLeft: '25%',
    // marginTop: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  headertext: {
    // backgroundColor:'red',
    width: '85%',
    marginTop: 20,
  },
  btnview: {
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  loginbtn: {
    color: '#6C88E7',
    fontSize: 14,
  },
});

export default Signup;
