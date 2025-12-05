
import {StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AppScreen from '../src/screens/AppScreen'
import Icon from '@expo/vector-icons/MaterialIcons'
import ProfileScreen from '../src/screens/ProfileScreen'

const Tab= createBottomTabNavigator();

function HomeAuthScreen(){
    return(
            <Tab.Navigator
                screenOptions={{
                    headerShown:false,
                    //tabBarStyle:styles.tabBar
                }}
            >
                <Tab.Screen name="Inicio" component={AppScreen}
                    options={{
                        tabBarIcon:({focused})=>(<Icon name="home" size={32} color={focused?styles.focus:styles.unFocus}></Icon>)
                    }}
                />
                <Tab.Screen name="Perfil" component={ProfileScreen}
                    options={{
                        tabBarIcon:({focused})=>(<Icon name="person" size={32} color={focused?styles.focus:styles.unFocus}></Icon>)
                    }}
                />
            </Tab.Navigator>
        )
    /*return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Perfil" component={Perfil} />
        </Stack.Navigator>
    )*/
}

export default HomeAuthScreen;

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
