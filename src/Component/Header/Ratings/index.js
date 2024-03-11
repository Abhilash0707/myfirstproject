import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Ratings = (props) => {
    const ratingVal=props.data;
    // console.log(props.route.params);
    console.log(ratingVal);
    const navigation = useNavigation();
  return (
    <View style={{flexDirection:'row'}}>
    {ratingVal >= 1?<AntDesign
        name="star"
        size={20}
        color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        // onPress={() => navigation.goBack()}
      />:<AntDesign
      name="staro"
      size={20}
      color="black"
      // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
      // onPress={() => navigation.goBack()}
    />}
     {ratingVal >= 2?<AntDesign
        name="star"
        size={20}
        color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        // onPress={() => navigation.goBack()}
      />:<AntDesign
      name="staro"
      size={20}
      color="black"
      // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
      // onPress={() => navigation.goBack()}
    />}
     {ratingVal >= 3?<AntDesign
        name="star"
        size={20}
        color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        // onPress={() => navigation.goBack()}
      />:<AntDesign
      name="staro"
      size={20}
      color="black"
      // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
      // onPress={() => navigation.goBack()}
    />}
     {ratingVal >= 4?<AntDesign
        name="star"
        size={20}
        color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        // onPress={() => navigation.goBack()}
      />:<AntDesign
      name="staro"
      size={20}
      color="black"
      // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
      // onPress={() => navigation.goBack()}
    />}
     {ratingVal >= 5?<AntDesign
        name="star"
        size={20}
        color="black"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        // onPress={() => navigation.goBack()}
      />:<AntDesign
      name="staro"
      size={20}
      color="black"
      // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
      // onPress={() => navigation.goBack()}
    />}

  </View>
  )
}

export default Ratings