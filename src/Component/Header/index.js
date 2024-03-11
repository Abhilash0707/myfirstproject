import {StyleSheet, Text, View,Alert} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Header = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  // const [logintoggle,setLogintoggle]=useState('');
  //   useEffect(() => {
  //  hideMenu();
  //   }, []);

  const hideMenu = () => {
    setVisible(false);
  };

  const showMenu = () => {
    setVisible(true);
  };
  // const navcart=()=>{
  //   navigation.navigate("Cart")
  //   {console.log('oye')}
  // }
  const logintoggle=()=>{
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
          onPress:async () => {
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
      {cancelable: false},
    );
   
  }
  
  // setLogintoggle(AsyncStorage.getItem('token'));

  // console.log(logintoggle,'logoutttttttttt');
  
  
  return (
    // <View style={styles.header}>
    //   <Text>Header</Text>
    // </View>
    <View style={styles.headercontainer}>
      <Octicons
        name="three-bars"
        size={25}
        color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        onPress={() => navigation.openDrawer()}
      />
      <Text style={styles.headertext}>Suyog Comp</Text>
      <Feather name="search" size={23} color="black"  />
      <View>
        <Feather
          name="shopping-bag"
          size={20}
          color="black"
            onPress={()=>navigation.navigate('Cart')}
          style={{
            marginRight: 8,
          }}
        />
      </View>
      <View>
        <Entypo
          name="dots-three-vertical"
          size={20}
          color="black"
          onPress={()=>setVisible(true)}
          style={{
            marginRight: 8,
          }}
        />
      </View>

      <View style={{padding: 10, position: 'absolute', right: 10, top: 0}}>
        <Menu
          style={{width: 150}}
          visible={visible}
          // anchor={<Text>Show menu</Text>}
          onRequestClose={()=>hideMenu()}>
          <MenuItem
              onPress={()=>{
                navigation.navigate('Profile')
                setVisible(true)}}
            textStyle={styles.menutext}>
            Profile
          </MenuItem>
          {/* <MenuDivider /> */}
          <MenuItem
            // onPress={gotoNotifiation}
            textStyle={styles.menutext}>
            Notifications
          </MenuItem>
          {/*  <MenuItem textStyle={styles.menutext}>
                {'Terms & Condition'}
              </MenuItem> */}
          <MenuItem
            onPress={()=>logintoggle()}
            textStyle={styles.menutext}>
            LogOut
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  headercontainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  headertext: {
    fontSize: 25,
    fontWeight: '900',
    color: 'black',
    fontStyle: 'italic',
  },
});
