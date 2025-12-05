import {createSlice} from '@reduxjs/toolkit'

export const userSlice=createSlice({
    name:'user',
    initialState:{
        value:{
            profilePicture:"",
            nombre:"",
            telefono:"",
            bio:"",
        }
    },
    reducers:{
        setProfilePicture:(state,action)=>{
            state.value.profilePicture=action.payload
        },
        setProfile:(state,action)=>{
            state.value.nombre=action.payload.nombre,
            state.value.telefono=action.payload.telefono,
            state.value.bio=action.payload.bio
        }
    }
})

export const {setProfilePicture,setProfile} =userSlice.actions
export default userSlice.reducer
