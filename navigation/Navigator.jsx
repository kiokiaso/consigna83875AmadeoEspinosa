import {StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeAuthScreen'
import Home from '../components/Home'
import Login from '../components/Login'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Tab= createBottomTabNavigator();

const Navigator=()=>{
    return(
        <Tab.Navigator
            screenOptions={{
                //headerShown:false,
                tabBarStyle:styles.tabBar
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon:({focused})=>(<Icon name="storefront" size={32} color={focused?styles.focus:styles.unFocus}></Icon>)
                }}
            />
            <Tab.Screen name="Login" component={Login}
                options={{
                    tabBarIcon:({focused})=>(<Icon name="storefront" size={32} color={focused?styles.focus:styles.unFocus}></Icon>)
                }}
            />
        </Tab.Navigator>
    )
}

export default Navigator
const styles=StyleSheet.create({
    tabBar:{
        height:64,
        backgroundColor:'000000',
    },
    focus:{
        color:'0067c6'
    },
    unFocus:{
        color:'0000FF'
    }
})