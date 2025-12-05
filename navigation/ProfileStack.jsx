
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux"
import ProfileScreen from '../src/screens/ProfileScreen';


const Stack = createNativeStackNavigator();


export default function AppScreen() {
    const user =useSelector(state=>state.authReducer.value.email)
    const isAdmin = user?.role === 'admin';


    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}