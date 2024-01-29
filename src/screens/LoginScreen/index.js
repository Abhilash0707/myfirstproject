


import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <View style={styles.logincontainer}>
        <Text style={styles.text1}>LOGIN</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.headertext}>
          <Text style={styles.text2}>USER ID</Text>
        </View>

        <TextInput style={styles.text} />

        <View style={styles.headertext}>
          <Text style={styles.text2}>PASSWORD</Text>
        </View>

        <TextInput secureTextEntry={true} style={styles.text} />
        <View style={styles.btnview}>
          <TouchableOpacity onPress={() => navigation.navigate('Drawernav')} style={styles.mybutton}>
            <Text style={{
              fontSize: 20,
              // fontFamily: 'bold',
              textAlign: 'center',
              color: '#2F8C78',

            }}>Login</Text>
            
          </TouchableOpacity  >
          <View style={{marginTop:10}}>

          <TouchableOpacity onPress={()=> navigation.navigate('signup')}><Text style={{color:'#2F8C78'}}>Don't have an account</Text></TouchableOpacity>
          </View>
          
        </View>
      </View >






    </View>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#1F1C46',

  },
  logincontainer: {
    marginTop: 30

  },

  container1: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: 'red',
    flex: 0.8,
    width: '100%'

  },
  text: {
    fontSize: 25,
    color: 'white',
    width: '85%',
    borderBottomColor: '#2F8C78',
    borderBottomWidth: 2,
  },
  text1: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    // fontFamily: 'bold',

  },
  text2: {
    fontSize: 15,
    // textAlign: 'center',
    color: '#087D2A',
    // fontFamily: 'bold',
    // marginLeft: '20%',


  },
  mybutton: {
    // fontSize:50,
    //  backgroundColor:'red',
    borderColor: '#2F8C78',
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
    width: '60%',
    // marginLeft: '25%',
    // marginTop: 30,




  },
  headertext: {
    // backgroundColor:'red',
    width: '85%',
    marginTop: 40
  },
  btnview: {
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: '100%'


  }


});

export default Login;
