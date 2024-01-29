import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


const Header = () => {
    const navigation = useNavigation();
  return (
    // <View style={styles.header}>
    //   <Text>Header</Text>
    // </View>
         <View style={styles.headercontainer}>
         <AntDesign name="bars" size={30} color="black"
             // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
             onPress={() => navigation.openDrawer()}

         />
         <Text style={styles.headertext}>Deliveroo</Text>
         <EvilIcons name="search" size={33} color="black" />
         {/* <Text>details</Text> */}
     </View>
  )
}

export default Header

const styles = StyleSheet.create({

    header:{
        height:'100%',
        width:'100%',
        flexDirection:'row'
    },
    headercontainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '98%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold'


    },
    headertext: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#C334F8'



    },
    

})