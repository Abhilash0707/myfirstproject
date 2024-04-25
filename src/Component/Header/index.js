import { StyleSheet, Text, View, Alert, Modal, TextInput, ScrollView, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ratings from '../../Component/Header/Ratings';


const Header = () => {

  const [visible, setVisible] = useState(false);
  const [modalVisible, SetModalVisible] = useState(false);
  const navigation = useNavigation();
  const [radiobtn, setRadiobtn] = useState(false);
  // const [ratingVal,setRatingval]=useState(true);
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [filtercat, setFiltercat] = useState([]);
  const [maindataarray, setDataarray] = useState([])
  const [selectedfilterlist, setSelectedfilterlist] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});





  const [ratingarr, setRatingarr] = useState([
    {
      id: '5',
      oncheck: false,
    },
    {
      id: '4',
      oncheck: false,
    },
    {
      id: '3',
      oncheck: false,
    },

    {
      id: '2',
      oncheck: false,
    },

    {
      id: '1',
      oncheck: false,
    },
  ]);

  // const toggleradiobtn = index => {
  //   let ratingdata = ratingarr;
  //   // console.log(radiobtn);
  //   if (ratingdata[index].oncheck) {
  //     ratingdata[index].oncheck = false;
  //     setRatingarr(ratingdata);
  //     setRadiobtn(!radiobtn);
  //   } else {
  //     ratingdata[index].oncheck = true;
  //     setRatingarr(ratingdata);
  //     setRadiobtn(!radiobtn);
  //   }
  // };


  const checkbtn = (index) => {
    let filtercatdata = filtercat;
    // console.log(radiobtn);
    if (filtercatdata[index].oncheck) {
      filtercatdata[index].oncheck = false;
      setFiltercat(filtercatdata);
      setRadiobtn(!radiobtn);
    } else {
      filtercatdata[index].oncheck = true;
      setFiltercat(filtercatdata);
      setRadiobtn(!radiobtn);
    }
    console.log(filtercat, 'abhi');
  };


  // console.log(ratingarr, 'iiii');
  useEffect(() => {
    apicall();
    console.log(maindataarray.filters, 'maindataarray');
  }, []);

  const apicall = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/filters',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            catId: 6,
          }),
        },
      );
      const json = await response.json();

      if (json.status === 1) {
        // const myjsondata = json.data;

        // let dataArray = [json];
        setDataarray(json)
        console.log(maindataarray, 'main-------')
        console.log(json.filters, 'sizefilter-------')
        console.log(json.brandfilter, 'brandfilter-------')
        setBrand(json.brandfilter?.data)
        setFiltercat(json.filters)
        // 
        // 


        setRadiobtn(!radiobtn);
      } else {
        Alert.alert(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const selectmyfilters = (filterName, item) => {
    console.log(filterName,'filtername--');
    setSelectedFilters((pre) => {
      //insert
      if(!pre[filterName]){
        pre[filterName] = [item];
        return pre;
      }else if (pre[filterName] && pre[filterName].indexOf(item) == -1){
        pre = {...pre, [filterName]: [...pre[filterName], item]};
      }else{
        // delete
        pre = {
          ...pre,
          [filterName]: pre[filterName].filter(value => value != item),
        };
      }
      return pre;
    });
  };


  
  const sizefiltertogglebtn = (index) => {

    console.log('Toggle button clicked for index:', index);
  };
  console.log('Selected Filters:', selectedFilters);

  // const filtercategory = ({ item, index }) => {
  //   console.log(item, 'myitem==');
  //   return (

  //   )
  // }



  // console.log(item,'ooooooo')




  // console.log(filtercat, 'filtercat');
  const filterrendercatdata = ({ item, index }) => (
    // <View><Text>{item}</Text></View>
    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
      {filtercat[index].oncheck ? (
        <MaterialIcons
          name="radio-button-on"
          size={22}
          color="#281E87"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}

          onPress={() => checkbtn(index, item)}
        />
      ) : (
        <MaterialIcons
          name="radio-button-off"
          size={22}
          color="#281E87"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          onPress={() => checkbtn(index, item)}
        />
      )}
      <View>
        <Text style={{ fontSize: 18, color: 'black', fontWeight: '600', marginLeft: '9%' }}>{item}</Text>
      </View>
    </View>
  )

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
              await AsyncStorage.removeItem('token')
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

  // setLogintoggle(AsyncStorage.getItem('token'));

  // console.log(logintoggle,'logoutttttttttt');
  const clearfilter = () => {

  }



  return (
    // <View style={styles.header}>
    //   <Text>Header</Text>
    // </View>
    <View style={styles.headercontainer}>
     
      <Feather
        name="align-left"
        size={28}
        color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        onPress={() => navigation.openDrawer()}
      />
      <Text style={styles.headertext}>Dafodill</Text>
      <Feather name="search" size={23} color="black"
        onPress={() => SetModalVisible(!modalVisible)}
      />
      <View>
        <Feather
          name="shopping-bag"
          size={20}
          color="black"
          onPress={() => navigation.navigate('Cart')}
          style={{
            marginRight: 8,
          }}
        />
      </View>
      <View>
        <AntDesign
          name="hearto"
          size={20}
          color="black"
          onPress={() => navigation.navigate('Wishlist')}
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
          onPress={() => setVisible(true)}
          style={{
            marginRight: 8,
          }}
        />
      </View>

      <View style={{ padding: 10, position: 'absolute', right: 10, top: 0 }}>
        <Menu
          style={{ width: 150 }}
          visible={visible}
          // anchor={<Text>Show menu</Text>}
          onRequestClose={() => hideMenu()}>
          <MenuItem
            onPress={() => {
              navigation.navigate('Profile')
              setVisible(true)
            }}
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
            onPress={() => logintoggle()}
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
  container: {
    flex: 1,
    backgroundColor: 'white'

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
    // marginLeft:50
  },
  headertext: {
    fontSize: 25,
    fontWeight: '900',
    color: 'black',
    fontStyle: 'italic',
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
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 23,
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
    // height: "45%"
  },
  sortingprice: {
    fontSize: 15,
    color: 'black',
    fontWeight: '800',
  },
});
