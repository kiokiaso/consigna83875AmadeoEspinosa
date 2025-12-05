import {StyleSheet,Text,TextInput,Pressable,Dimensions,View} from 'react-native'
//import {colors} from "../../theme/colors"
import {useEffect, useState} from 'react'
import { useSignupMutation } from '../../services/authService'

const textInputWidth=Dimensions.get('window').width*0.7

const SignupScreen=({navigation})=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("")

    const [triggerSignUp,result]=useSignupMutation()

    //console.log("Resultado",result)

    const onsubmit=()=>{
        triggerSignUp({email,password})
    }
    useEffect(()=>{
        if(result.status=="fulfilled"){
            navigation.navigate("Login")
        }
        else{
            console.log("Se produjo un error al crear el usuario")
        }
    },[result])
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Seguimiento ventas</Text>
            <Text style={styles.subTitle}>Registrate</Text>
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
                <TextInput 
                    onChangeText={(text)=>setConfirmPassword(text)}
                    placeholderTextColor="#000"
                    placeholder='Repetir Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿ya tienes una cuenta?</Text>
                <Pressable onPress={()=>navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>Iniciar sesión</Text>
                </Pressable>
            </View>
            <Pressable style={styles.btn} onPress={onsubmit}>
                <Text>Crear cuenta</Text>
            </Pressable>
        </View>
    )
}

export default SignupScreen

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

