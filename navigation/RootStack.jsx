import {NavigationContainer} from "@react-navigation/native"
import HomeAuthScreen from "./HomeAuthScreen"
import { useDispatch, useSelector } from "react-redux"
import AuthNavigator from "./AuthNavigator"
import { useGetProfilePictureQuery } from "../services/userService"
import { useEffect } from "react"
import { setProfilePicture,setProfile } from "../features/user/userSlice"

const RootStack =()=>{
    const user =useSelector(state=>state.authReducer.value.email)
    const localId=useSelector(state=>state.authReducer.value.localId)
    const {data:profilePicture,isLoading,error} = useGetProfilePictureQuery(localId)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
            //console.log(profilePicture.localId)
            if(profilePicture.nombre){
                dispatch(setProfile({nombre:profilePicture.nombre,telefono:profilePicture.telefono,bio:profilePicture.bio}))
            }else{
                dispatch(setProfile({nombre:"N",telefono:"T",bio:"B"}))
            }
            
        }
    },[profilePicture])
    
     
    return(
        <NavigationContainer>
        {
            user ? <HomeAuthScreen /> : <AuthNavigator />
        }
        </NavigationContainer>
    )
}

export default RootStack

