


import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const signup = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            <View style={styles.logincontainer}>
                <Text style={styles.text1}>Welcome To Sign Up</Text>
                <Text style={styles.text1a}>Fill out this Form to Sign up</Text>
            </View>
            <View style={styles.container1}>
                <View style={styles.headertext}>
                    <Text style={styles.text2}>USER ID/Full Name</Text>
                </View>
                <TextInput value='acjhdh' style={styles.text} />
                <View style={styles.headertext}>
                    <Text style={styles.text2}>Email</Text>
                </View>
                <TextInput style={styles.text} value='acjhdh@gmail.com' />

                <View style={styles.headertext}>
                    <Text style={styles.text2}>Password</Text>
                </View>
                <TextInput secureTextEntry={true} style={styles.text} value='acjhdhtytyset' />



                <View style={styles.btnview}>
                    <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.mybutton}>
                        <Text style={{
                            fontSize: 20,
                            // fontFamily: 'bold',
                            textAlign: 'center',
                            color: 'white',

                        }}>Sign up</Text>

                    </TouchableOpacity  >
                    <View style={{ marginTop: 40,flexDirection:'row' }}>
                       <Text>Already have an account?</Text>
                       <Pressable onPress={() => navigation.navigate('login')}><Text style={styles.loginbtn}>Login here</Text></Pressable>

                        {/* <Text>Already have an account?
                            <TouchableOpacity ><Text >Login</Text></TouchableOpacity>
                            here
                        </Text> */}


                    </View>

                </View>
            </View >






        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'white',

    },
    logincontainer: {
        marginTop: 60

    },

    container1: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //  backgroundColor: 'red',
        flex: 0.8,
        width: '100%'

    },
    text: {
        fontSize: 14,
        color: '#BFC6D2',
        width: '85%',
        borderBottomColor: '#BFC6D2',
        borderBottomWidth: 2,
        fontWeight: 'bold',

    },
    text1: {
        fontSize: 30,
        //textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        marginLeft: '5%'

    },
    text1a: {
        //
        //textAlign: 'center',
        color: '#86888B',
        fontWeight: 'bold',
        marginLeft: '5%'

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
        color: 'white'




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


    },
    loginbtn:{
        color:'#6C88E7',
        fontSize:14
    }



});

export default signup;
