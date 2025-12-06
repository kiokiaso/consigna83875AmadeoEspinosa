import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ArrowBigLeft, Search } from "lucide-react-native";
import { useSelector } from 'react-redux';


export default function Cliente({ navigation }) {
    const localId = useSelector(state => state.authReducer.value.localId)
    const [principal, setPrincipal] = useState(true)
    const dat = useSelector(state => state.prospectoReducer.lista)
    const data = dat.filter(u => u.estado === "Cliente")
    //console.log("Datos de la oportunidad",data)

    const [search, setSearch] = useState(false);
    const [datos, setDatos] = useState(data);

    const activarBuscar = () => {
        setSearch((prev) => !prev)
    }
    const handleChange = (val) => {
        const filtrados = data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(val.toLowerCase())
            ));
        setDatos(filtrados)
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.titulo}>
                Clientes
            </Text>
            <View style={styles.topButtons}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => { navigation.navigate("Home") }} >
                    <ArrowBigLeft color="#FFF" />
                    <Text style={styles.buttonText}>Regresar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSecondary} onPress={activarBuscar} >
                    <FontAwesome name="search" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Buscar </Text>
                </TouchableOpacity>

            </View>
            {
                search ? (<View style={{ marginBottom: 20 }}>
                    <View style={styles.viewInput}>
                        <Search color="#cbd5e1" size={20} />
                        <TextInput
                            placeholder="Escribe el dato a buscar"
                            placeholderTextColor="#000"
                            style={styles.campoInput}
                            onChangeText={(v) => handleChange(v)}
                        />
                    </View>
                    <View style={styles.topButtons}>
                        <TouchableOpacity style={styles.buttonSecondary} onPress={activarBuscar} >
                            <FontAwesome name="search" size={18} color="#fff" />
                            <Text style={styles.buttonText}>Cancelar Busqueda </Text>
                        </TouchableOpacity>
                    </View>
                </View>) : (
                    <View></View>
                )
            }


            {/* Tabla */}
            <View style={styles.table}>
                {/* Encabezado */}
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Nombre</Text>
                    <Text style={styles.headerText}>Contacto</Text>
                    <Text style={styles.headerText}>Email</Text>
                    <Text style={styles.headerText}>Teléfono</Text>
                    <Text style={styles.headerText}>Fecha de alta</Text>
                    <Text style={styles.headerText}>Acción</Text>
                </View>

                {/* Filas */}
                {
                    datos?.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.rowText}>{item.empresa}</Text>
                            <Text style={styles.rowText}>{item.contacto}</Text>
                            <Text style={styles.rowText}>{item.email}</Text>
                            <Text style={styles.rowText}>{item.telefono}</Text>
                            <Text style={styles.rowText}>{item.fecha}</Text>

                            <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('DetalleCliente', {
                                item:item.id, localId
                            })}>
                                <FontAwesome name="eye" size={18} color="#007AFF" />
                            </TouchableOpacity>
                        </View>

                    ))

                }
            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: "#F5F6FA",
        marginTop:30
    },
    content: {
        padding: 20,
        paddingBottom: 60,
    },
    nombreCampo: { color: "#000", marginBottom: 8 },
    viewInput: {
        backgroundColor: "#797b7dff",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    campoInput: {
        flex: 1,
        paddingVertical: 12,
        marginLeft: 10,
        color: "white"
    }, titulo: {
        color: "#000",
        fontSize: 32,
        fontWeight: "800",
        marginBottom: 25
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
    buttonBack: {
        flexDirection: "row",
        backgroundColor: "#d72307ff",
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