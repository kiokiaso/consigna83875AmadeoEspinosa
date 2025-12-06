
import { StyleSheet,View, Pressable,Image,Text,TouchableOpacity } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { setProfilePicture,setProfile } from "../../features/user/userSlice";
import { clearUser } from '../../features/auth/authSlice'
import { limpiarLista } from '../../features/prospecto/prospectoSlice'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useState,useRef } from "react";
import {CameraView,useCameraPermissions} from 'expo-camera'
import { usePutProfilePictureMutation,usePutProfileSaveMutation } from "../../services/userService";
import * as FileSystem from "expo-file-system/legacy";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";


const ProfileScreen=()=>{
    const db=useSQLiteContext()

    const [editarPerfil,setEditarPerfil]=useState(false)
    
    const user=useSelector(state=>state.authReducer.value.email)
    const localId=useSelector(state=>state.authReducer.value.localId)
    const image=useSelector(state=>state.userReducer.value.profilePicture)
    const datosPerfil=useSelector(state=>state.userReducer.value)
    //console.log("datos del perfil",datosPerfil.telefono,datosPerfil.nombre,datosPerfil.bio)
    const dispatch=useDispatch()
    //Uso de la cámara
    const [cameraOpen,setCameraOpen]=useState(false)
    const [permission,requestPermission]=useCameraPermissions()
    const cameraRef=useRef(null)
    //Real Time Database
    const [triggerPutProfilePicture,result]=usePutProfilePictureMutation()
    const [triggerPutProfileSave,resultProfile]=usePutProfileSaveMutation()

    const openCamera = async () => {
        if (!permission?.granted) {
        await requestPermission();
        }
        setCameraOpen(true);
    };
    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                allowsEditing:true,
                aspect:[1,1],
                quality: 0.7,
                base64: true,
            });
            // Convertir a base64
            const base64 = await FileSystem.readAsStringAsync(photo.uri, {
                encoding: "base64",
            });
            dispatch(setProfilePicture(`data:image/jpeg;base64,${base64}`))
            triggerPutProfilePicture({image:`data:image/jpeg;base64,${base64}`,localId,nombre:datosPerfil.nombre,telefono:datosPerfil.telefono,bio:datosPerfil.bio})
            setCameraOpen(false);
        }
    };
    const guardarPerfil=(dat)=>{
        console.log(dat)
        dispatch(setProfile({nombre:"Amadeo",telefono:"123456",bio:"Haciendo pruebas"}))
        triggerPutProfileSave({nombre:"Amadeo",telefono:"123456",bio:"Haciendo pruebas",localId})
        setEditarPerfil((prev)=>!prev)
    }

    if (cameraOpen) {
        return (
            <CameraView ref={cameraRef} style={styles.camera}>
                <TouchableOpacity style={styles.shutter} onPress={takePicture} />
            </CameraView>
        );
    }

    const form=()=>{
        setEditarPerfil((prev)=>!prev)
    }
    
    
    const logOut=async ()=>{
            try {
                const resultado=await db.runAsync('DELETE FROM sessions WHERE localId=$localId',{$localId:localId})
                dispatch(clearUser())
                dispatch(limpiarLista()); 
            } catch (error) {
                
            }
        }
    return (
        <View style={styles.container}>
            
            {
                editarPerfil?
                (<EditProfile formulario={form}  logout={logOut} datos={datosPerfil} correo={user} imagen={image} localId={localId}/>):
                (<Profile form={form} logout={logOut} datosPerfil={datosPerfil} email={user} openCamera={openCamera} imagen={image}/> )
            }
            <View>
                
            </View>
        </View>
       
    );
}
export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
  },

  /** Avatar circular */
  avatarContainer: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  letterCircle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },

  letter: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#fff",
  },

  /** Botón flotante sobre el avatar */
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 40,
    elevation: 4,
  },
  
    header: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    profileData:{
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },

  /** Cámara */
  camera: {
    width: "100%",
    height: "100%",
  },

  shutter: {
    position: "absolute",
    bottom: 40,
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 40,
    alignSelf: "center",
  },
});
/*
const styles=StyleSheet.create({
    profileContainer:{
        padding:32,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    imageProfileContainer:{
        width: 150,
        height: 150,
        borderRadius: 75, // Para hacerla circular
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#ffffff',
        justifyContent:'center',
        alignItems:'center',
        padding:40,
        backgroundColor: '#d51212ff',
    },
    profileImage:{
        width: 100, // Ancho de la imagen
        height: 100, // Alto de la imagen
        borderRadius: 50, // Para que sea un círculo, la mitad del ancho/alto
        resizeMode: 'cover', 
    },
    textProfilePlaceHolder:{
        fontSize:26,
        fontWeight:'700',
        color:'#FFF',
        //backgroundColor: '#d51212ff',
        height:100,
        width:100,
        borderRadius:50,
        textAlignVertical:'center',
        textAlign:'center'
    },
    cameraIcon:{
        marginLeft:90,
        width: '50%',
    },
    profileData:{
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
})*/



