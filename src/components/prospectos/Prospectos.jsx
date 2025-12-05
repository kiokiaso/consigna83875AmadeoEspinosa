import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useGetProspectosQuery, usePutProspectoMutation } from '../../../services/prospectoService';
import Principal from './Principal';
import AgregarProspecto from './AgregarProspecto';
import { useSelector } from 'react-redux';


export default function Prospectos({navigation }) {
    const localId = useSelector(state => state.authReducer.value.localId)
    const [principal, setPrincipal] = useState(true)
    //const { data, isLoading, error } = useGetProspectosQuery();
    
        const datos=useSelector(state=>state.prospectoReducer.lista)
        const data=datos.filter(u=>u.estado==="Prospecto")

    const cambiarPrincipal = () => {
        setPrincipal((prev) => !prev)
    }

    return (
        <View >

            {
                principal ?
                    (<Principal cambiarPrincipal={cambiarPrincipal} localId={localId} data={data} navigation={navigation} />) :
                    (<AgregarProspecto cambiarPrincipal={cambiarPrincipal} localId={localId} />)
            }
            <View>

            </View>
        </View>



    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },
    content: {
        padding: 20,
        paddingBottom: 60,
    },

    /** BOTONES SUPERIORES **/
    topButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    buttonPrimary: {
        flexDirection: "row",
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonSecondary: {
        flexDirection: "row",
        backgroundColor: "#34C759",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 8,
    },

    /** TABLA **/
    table: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#F0F2F7",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 6,
    },
    headerText: {
        flex: 1,
        fontWeight: "700",
        color: "#333",
        textAlign: "center",
    },

    tableRow: {
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    rowText: {
        flex: 1,
        textAlign: "center",
        color: "#555",
        fontSize: 14,
    },

    detailButton: {
        flex: 0.5,
        alignItems: "center",
    },
});