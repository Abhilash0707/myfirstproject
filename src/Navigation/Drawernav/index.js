import Details from '../../screens/DetailsScreen';
// import {  createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from '../BottomTabNavigation';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import { FlatList } from "react-native-gesture-handler";
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import the Icon component
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {FlatList} from 'react-native-gesture-handler';
import BuyNow from '../../screens/BuyNow';
import Newarrival from '../../screens/NewArrival';

// Replace with your actual icon library

function CustomDrawerContent({navigation, ...props}) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isVisible, setIsVisible] = useState('');
  const [isVisiblesub, setIsVisiblesub] = useState('');

  const apicall = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/home/categories',
      );

      const res = await response.json();
      // console.log(res,'.......categories response');
      if (res.status === 1) {
        setCategories(res.data);
      } else {
        Alert.alert(res.message);
      }

    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    apicall();
  }, []);

  const newarrivalnav=()=>{
    navigation.navigate('Newarrival'),console.log('hii')
    navigation.closeDrawer()

  }

  const showSubcategories = ({item, index}) => (
    <>
      <DrawerItem
        label={item.category_name}
        onPress={() => {
          if (isVisiblesub === index) {
            setIsVisiblesub('');
          } else {
            setIsVisiblesub(index);
          }

          // Handle subcategory item press as needed
          console.log(`Pressed subcategory: ${JSON.stringify(item)}`);
        }}
        labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
        icon={() => (
          <AntDesign
            name="downcircle"
            size={23}
            color="black"
            style={{marginLeft: 15}}
          />
        )}
      />
      {isVisiblesub === index && (
        <FlatList data={item.subcategories} renderItem={showSubsubcategories} />
      )}
    </>
  );
  const showSubsubcategories = ({item, index}) => (
    <>
      <DrawerItem
        label={item.category_name}
        onPress={() => {
          // setIsVisiblesub(index)
          // Handle subcategory item press as needed
          console.log(`Pressed subcategory: ${JSON.stringify(item)}`);
          navigation.navigate('Listing', {item: item,})
        }}
        labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 15}}
      />
    </>
  );
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="NEWARRIVAL"
        style={{color: 'black', justifyContent: 'center'}}
        labelStyle={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center',
        }}
        // onPress={newarrivalnav}
      />
      {categories.length
        ? categories.map((item, index) => (
            <React.Fragment key={index}>
              <DrawerItem
                label={item.category_name}
                onPress={() => {
                  if (isVisible === index) {
                    setIsVisible('');
                  } else {
                    setIsVisible(index);
                  }
                  
                }}
                icon={() => (
                  <AntDesign name="downcircle" size={23} color="black" />
                )} // Adjust the icon prop as needed
                labelStyle={{color: 'black', fontWeight: 'bold', fontSize: 18}}
              />

              {isVisible === index && (
                <FlatList
                  data={item.subcategories}
                  renderItem={showSubcategories}
                />
              )}
            </React.Fragment>
          ))
        : null}
      <DrawerItem
        label="FEATURED PRODUCT"
        // style={{color:'black',justifyContent:'center',fontWeight:'bold',fontSize:20}}
        labelStyle={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 18,
          alignSelf: 'center',
        }}
      />
    </DrawerContentScrollView>
  );
}

const Drawernav = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="details"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'white',
          borderWidth: 1.5,
          borderColor: 'black',
          width: '70%',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* <Drawer.Screen
        name="BuyNow"
        component={BuyNow}
        
      /> */}
      {/* <Drawer.Screen name="Newarrival" component={Newarrival} /> */}

      <Drawer.Screen
        name="details"
        component={Details}
        options={{
          title: 'Home',

          drawerIcon: ({focused, size}) => (
            <Icon name="home" size={size} color="black" />
          ),
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default Drawernav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuItemsCard: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
});
