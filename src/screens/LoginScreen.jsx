import {StyleSheet,Text,TextInput,Pressable,Dimensions,View} from 'react-native'
//import {colors} from "../../theme/colors"
import {useState,useEffect} from 'react'
import { useLoginMutation } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/auth/authSlice'
import { useSQLiteContext } from 'expo-sqlite'
import Toast from 'react-native-toast-message'

const textInputWidth=Dimensions.get('window').width*0.7

const LoginScreen=({navigation})=>{
    const db=useSQLiteContext()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch()
    const [triggerLogin,result]=useLoginMutation()
    
    const onSubmit=()=>{
        if (!email.trim()) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "El usuario es obligatorio",
            });
            return;
        }

        if (!password.trim()) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "La contraseña es obligatoria",
            });
            return;
        }
        triggerLogin({email,password})
    }

    useEffect(()=>{
        async function setup(){
            const result = await db.getFirstAsync("SELECT * FROM sessions")
            console.log("Usuarios en db: ",result)
            if(result.email){
                dispatch(setUser({email:result.email,localId:result.localId}))
            }
        }
        setup()
    },[])
    
    const saveUserInDB=async (email,localId)=>{
        try {
            const result=await db.runAsync("INSERT INTO sessions (email,localId) VALUES(?,?)",email,localId)
            console.log("Usuario agregado correctamente a la base de datos")
        } catch (error) {
            console.log("Error al cargar el usuario en la bd:",error)
        }
    }

    useEffect(()=>{
        async function saveUser(){
            if(result.status=="fulfilled"){
                dispatch(setUser(result.data))
                await saveUserInDB(result.data.email,result.data.localId)
                 Toast.show({
                    type: "success",
                    text1: "Bienvenido",
                    text2: result.data.email,
                });
            }else{
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "El usuarios o contraseña son incorrectos",
                });
               // console.log("Se produjo un error al iniciar sesión")
            }
        }
        saveUser()
    },[result])
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Seguimiento ventas</Text>
            <Text style={styles.subTitle}>Inicio de sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    onChangeText={(text)=>setEmail(text)}
                    placeholderTextColor="#000"
                    placeholder='Email'
                    style={styles.textInput}
                    keyBoardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput 
                    onChangeText={(text)=>setPassword(text)}
                    placeholderTextColor="#000"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={()=>navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>Crea una</Text>
                </Pressable>
            </View>
            <Pressable style={styles.btn} onPress={onSubmit}>
                <Text style={styles.whiteText}>Iniciar Sesión</Text>
            </Pressable>
        </View>
    )
}

export default LoginScreen



const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#0067c6"
    },
    title:{
        color:"#000",
        fontFamily:"PressStart2P",
        fontSize:24,
        fontWeight:'900',
    },
    subTitle:{
        fontFamily:"Montserrat",
        fontSize:18,
        color:"#a0ad2cff",
        fontWeight:'700',
        letterSpacing:3
    },
    inputContainer:{
        gap:16,
        margin:16,
        marginTop:48,
        alignItems:'center',
    },
    textInput:{
        padding:10,
        paddingLeft:16,
        borderRadius:16,
        backgroundColor:"#FFF",
        width:textInputWidth,
        color:"#000"
    },
    footTextContainer:{
        flexDirection:'row',
        gap:8
    },
    whiteText:{
        color:"#FFF"
    },
    underLineText:{
        textDecorationColor:'underline'
    },
    strongText:{
        fontWeight:'900',
        fontSize:16
    },
    btn:{
        padding:16,
        paddingHorizontal:32,
        backgroundColor:"#9c1375ff",
        borderRadius:16,
        marginTop:32
    },
    btnText:{
        color:"#FFF",
        fontSize:16,
        fontWeight:'700'
    },
    guestOptionContainer:{
        alignItems:'center',
        marginTop:64
    }
})