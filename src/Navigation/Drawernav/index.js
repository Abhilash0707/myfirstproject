import Details from "../../screens/DetailsScreen";
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from "../BottomTabNavigation";
import { StyleSheet, View, useWindowDimensions } from 'react-native';
function CustomDrawerContent(props) {
    const width = useWindowDimensions().width * 0.3;
  
    return (
      <DrawerContentScrollView {...props}>
     
          <View
            style={[
              styles.menuItemsCard,
              { backgroundColor: '#EFFFD5', width: width, height: width },
            ]}>
        
  
            <DrawerItem
              style={{
                position: 'absolute',
                left: 0,
                width: width,
                height: width,
              }}
              label="Screen2"
              labelStyle={{ color: '#609806' }}
              onPress={() => {
                console.log(props.navigation)
                props.navigation.closeDrawer();
                props.navigation.navigate('testScreen');
              }}
            />
          </View>
 
      </DrawerContentScrollView>
    );
  }
const Drawernav = () => {
    const Drawer = createDrawerNavigator();
    return (
   
        <Drawer.Navigator initialRouteName='Details' screenOptions={{ headerShown: false,
            drawerStyle: {
                backgroundColor: '#B6D0E2',
                 // Set the background color here
                 borderWidth:2,
                 borderColor:'black'
            },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="details" component={BottomTabNavigation}
                options={{
                    title: 'Home',
                   
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name='home'
                            size={size}
                            color='black'
                        />
                    ),
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                   
                }}
            />
  
        </Drawer.Navigator>

    )
}
export default Drawernav
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
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    circleContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 10,
    },
  });
