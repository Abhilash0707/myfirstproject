
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import signup from '../../screens/SignupScreen';
import Login from '../../screens/LoginScreen'
import Drawernav from '../Drawernav';

const StackNav = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
             <Stack.Screen name="signup" component={signup} />
             <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Drawernav" component={Drawernav} />
        </Stack.Navigator>
    );
}
export default StackNav
