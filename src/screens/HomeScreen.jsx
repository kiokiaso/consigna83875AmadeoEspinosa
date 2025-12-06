import React, { useEffect,useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MenuButton from '../components/MenuButton';
//import { useAuth } from '../services/authService';
import { useSelector, useDispatch } from "react-redux"
//import { useGetProspectosQuery } from "../../services/prospectoService"
import { limpiarLista } from '../../features/prospecto/prospectoSlice'
import { useSQLiteContext } from 'expo-sqlite'
import { clearUser } from '../../features/auth/authSlice'
import { store } from "../../app/store";
import { escuchaProspectos } from "../../services/escuchaProspectos";


export default function MainScreen({ navigation }) {
    const db = useSQLiteContext()
    const user = useSelector(state => state.authReducer.value.email)
    const localId = useSelector(state => state.authReducer.value.localId)
    //const isAdmin = user?.email === 'kio_kiaso@hotmail.com';
    //const { data: prospectos, isLoadingPros, errorPros } = useGetProspectosQuery()
    const dispatch = useDispatch()
    const [stop, setStop] = useState(null);
    const local = useSelector(state => state.prospectoReducer.lista)
    console.log(local)

    useEffect(() => {
        console.log(user)
        if (user) {
            //console.log("entra")
            const stop = escuchaProspectos(store,localId);
            setStop(() => stop);
            return () => {
                // cleanup al desmontar
                //if (stop) stop();
               // dispatch(logOut());
            };

            
        }
        /*if(prospectos){
            console.log("-----pros ---------")
            console.log(prospectos)
            const resultado=prospectos.filter(u=>u.localId===localId)
            dispatch(setProspecto(resultado))
            console.log("-----res---------")
            console.log(resultado)
           
        }*/
    }, [user])
    /*if (isLoadingPros) {
        return <Text>Cargando datos...</Text>;
    }*/
    const logOut = async () => {
        try {
            const resultado = await db.runAsync('DELETE FROM sessions WHERE localId=$localId', { $localId: localId })
            dispatch(clearUser())
            dispatch(limpiarLista());
        } catch (error) {

        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Menú Principal</Text>
            <View style={styles.grid}>
                <MenuButton title="Prospectos" icon="person-add" onPress={() => navigation.navigate('Prospectos')} />
                <MenuButton title="Oportunidades" icon="trending-up" onPress={() => navigation.navigate('Oportunidad')} />
                <MenuButton title="Clientes" icon="groups" onPress={() => navigation.navigate('Cliente')} />
                <MenuButton title="Cerrar sesión" icon="logout" onPress={logOut} />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    grid: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
});