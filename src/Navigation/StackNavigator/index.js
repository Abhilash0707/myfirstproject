
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/LoginScreen'
import Drawernav from '../Drawernav';
import Details from '../../screens/DetailsScreen';
import SplashScreen from '../../screens/SplashScreen';
import Newarrival from '../../screens/NewArrival';
import BuyNow from '../../screens/BuyNow';
import Cart from '../../screens/Cart';
import TestScreen from '../../screens/TestScreen';
import Signup from '../../screens/SignupScreen';
import Profile from '../../screens/Profile';
import Wishlist from '../../screens/Wishlist';
import Listing from '../../screens/Listingpage';



const StackNav = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
             <Stack.Screen name="signup" component={Signup} />
             <Stack.Screen name="SplashScreen" component={SplashScreen} />
             <Stack.Screen name="Newarrival" component={Newarrival} />
             <Stack.Screen name="BuyNow" component={BuyNow} />
             <Stack.Screen name="login" component={Login} />
             <Stack.Screen name="Cart" component={Cart} />
             <Stack.Screen name="TestScreen" component={TestScreen} />
             <Stack.Screen name="Drawernav" component={Drawernav} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Wishlist" component={Wishlist} />
            <Stack.Screen name="Listing" component={Listing} />
        </Stack.Navigator>
    );
}
export default StackNav
