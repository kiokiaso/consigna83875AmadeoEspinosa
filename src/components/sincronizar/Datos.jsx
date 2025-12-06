import { StyleSheet, Text, TextInput, Pressable, Dimensions, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProspectosQuery } from  "../../../services/prospectoService"
import { setProspecto } from "../../../features/prospecto/prospectoSlice"

const textInputWidth = Dimensions.get('window').width * 0.7

const Datos = ({ navigation }) => {
    const user =useSelector(state=>state.authReducer.value.email)
    const localId=useSelector(state=>state.authReducer.value.localId)
    const { data: prospectos, isLoadingPros, errorPros } = useGetProspectosQuery()
    const dispatch=useDispatch()
   

    const onSubmit = async () => {
        console.log("-----------------------------------------------")
        console.log("Buscando..")
        //const response = useGetProspectosQuery();
        console.log(errorPros)
        console.log("-----prospecto--")
        console.log(prospectos)
        console.log("-------")
        const resultado=prospectos.filter(u=>u.localId===localId)
        console.log("-----resultado--")
        dispatch(setProspecto(resultado))
        console.log(resultado)
        console.log("-------")
        //console.log(response);
    }

    /*useEffect(() => {
        async function setup() {
            const result = await db.getFirstAsync("SELECT * FROM sessions")
            if (result.email) {
                dispatch(setUser({ email: result.email, localId: result.localId }))
                setUs(true)
            }
        }
        setup()
    }, [])*/


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos a sincronizar</Text>
            <Text style={styles.subTitle}>Oportunidades</Text>
            <Text style={styles.subTitle}>Prospectos</Text>
            <Text style={styles.subTitle}>Clientes</Text>
            
            <Pressable style={styles.btn} onPress={onSubmit}>
                <Text style={styles.whiteText}>Sincronizar</Text>
            </Pressable>
        </View>
    )
}

export default Datos



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0067c6"
    },
    title: {
        color: "#000",
        fontFamily: "PressStart2P",
        fontSize: 24,
        fontWeight: '900',
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: "#a0ad2cff",
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',
    },
    textInput: {
        padding: 10,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: "#FFF",
        width: textInputWidth,
        color: "#000"
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8
    },
    whiteText: {
        color: "#FFF"
    },
    underLineText: {
        textDecorationColor: 'underline'
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: "#9c1375ff",
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    }
})