import Feather from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestScreen from '../../screens/TestScreen';
import Foundation from 'react-native-vector-icons/Foundation';
// import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Order from '../../screens/Order';
import Details from '../../screens/DetailsScreen';
import Icon from 'react-native-vector-icons/FontAwesome'
const BottomTabNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="details" component={Details}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='home'
                            size={size}
                            color='black'
                        />
                    ),
                }} />
            <Tab.Screen name='testScreen' component={TestScreen}
                options={{
                    tabBarLabel: 'Test',
                    tabBarIcon: ({ color, size }) => (
                        <Foundation
                            name='page-copy'
                            size={size}
                            color='black' />

                    ),
                }} />
            <Tab.Screen name='order' component={Order}
                options={{
                    tabBarLabel: 'Order',
                    tabBarIcon: ({ color, size }) => (
                        <Feather
                            name='shopping-bag'
                            size={size}
                            color='black' />
                    ),
                }} />

        </Tab.Navigator>
    )

}

export default BottomTabNavigation