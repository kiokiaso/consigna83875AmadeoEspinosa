import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Mail, Phone, Info, Building2, MapPinHouse, Component, DecimalsArrowRight } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { usePutProspectoMutation } from "../../../services/prospectoService";
import Toast from 'react-native-toast-message'
import { actualizarProspecto } from "../../../features/prospecto/prospectoSlice";
import ModalSelector from 'react-native-modal-selector'

const EditarCliente = ({ navigation, route }) => {
    const [form, setForm] = useState({ empresa: route.params.item.empresa, domicilio: route.params.item.domicilio, email: route.params.item.email, telefono: route.params.item.telefono, observaciones: route.params.item.observaciones, contacto: route.params.item.contacto, modelo: route.params.item.modelo, monto: route.params.item.monto });
    const dispatch = useDispatch()
    const [triggerPutProspecto, result] = usePutProspectoMutation()
    /*console.log("--------------------------------------------")
     console.log("Datos en editar nueva revisión: ",route.params.item)*/
    const [tipo, setTipo] = useState(route.params.item.tipo)
    const [estado, setEstado] = useState(route.params.item.estadoOportunidad)
    const [tamano, setTamano] = useState(route.params.item.tamano)
    const [marca, setMarca] = useState(route.params.item.marca)
    const [tipoMFP, setTipoMFP] = useState(route.params.item.tipoMFP)

    const datosTipo = [
        { key: 1, label: 'Arrendamiento', value: 'Arrendamiento' },
        { key: 2, label: 'Venta', value: 'Venta' }
    ]
    const datosEstado = [
        { key: 1, label: 'Nuevo', value: 'Nuevo' },
        { key: 2, label: 'Seminuevo', value: 'Seminuevo' }
    ]
    const datosTamano = [
        { key: 1, label: 'A3', value: 'A3' },
        { key: 2, label: 'A4', value: 'A4' }
    ]
    const datosMarca = [
        { key: 1, label: 'Sharp', value: 'Sharp' },
        { key: 2, label: 'Epson', value: 'Epson' },
        { key: 3, label: 'Fujifilm', value: 'Fujifilm' },
        { key: 4, label: 'Konica Minolta', value: 'Konica Minolta' },
        { key: 5, label: 'Katn', value: 'Katn' },
        { key: 6, label: 'Ricoh', value: 'Ricoh' },
    ]
    const datosTipoMFP = [
        { key: 1, label: 'Color', value: 'Color' },
        { key: 2, label: 'Monocromo', value: 'Monocromo' }
    ]


    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value })
    }
    const guardarProspecto = () => {
        Object.entries(form).forEach(([key, value]) => {
            //console.log(key,value)
            if (!value.trim()) {
                Toast.show({
                    type: "error",
                    text1: key,
                    text2: key + " es obligatorio",
                });
                return;
            }

        });
        //const altaProspecto = { localId, empresa: form.empresa, domicilio: form.domicilio, contacto: form.contacto, telefono: form.contacto, email: form.email, observaciones: form.observaciones, estado: 'Prospecto', fecha: new Date().toISOString() }
        const campos =
        {
            empresa: form.empresa,
            domicilio: form.domicilio,
            contacto: form.contacto,
            telefono: form.contacto,
            email: form.email,
            observaciones: form.observaciones,
        }
        const res = triggerPutProspecto({
            id: route.params.item.id,
            campos: campos
        })


        // altaProspecto.id = res.requestId
        //dispatch(addProspecto(altaProspecto))
        dispatch(actualizarProspecto({
            id: route.params.item.id,
            cambios: campos
        }));
        navigation.navigate("DetalleCliente", { item: route.params.item.id })
    }
    return (

        <KeyboardAvoidingView
            style={styles.keyBoard}
            behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}
                >
                    <Text style={styles.titulo}>
                        Modificar datos
                    </Text>

                    <Text style={styles.secondaryTitulo}>
                        Datos del prospecto
                    </Text>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Empresa </Text>
                        <View style={styles.viewInput}>
                            <Building2 color="#cbd5e1" size={20} />
                            <TextInput
                                placeholder="Nombre de la empresa"
                                placeholderTextColor="#000"
                                style={styles.campoInput}
                                value={form.empresa}
                                onChangeText={(v) => handleChange("empresa", v)}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Contacto </Text>
                        <View style={styles.viewInput}>
                            <User color="#cbd5e1" size={20} />
                            <TextInput
                                placeholder="Escribe el nombre del contacto"
                                placeholderTextColor="#000"
                                style={styles.campoInput}
                                value={form.contacto}
                                onChangeText={(v) => handleChange("contacto", v)}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Domicilio </Text>
                        <View style={styles.viewInput}>
                            <MapPinHouse color="#cbd5e1" size={20} />
                            <TextInput
                                placeholder="Escribe el domicilio"
                                placeholderTextColor="#000"
                                style={styles.campoInput}
                                value={form.domicilio}
                                onChangeText={(v) => handleChange("domicilio", v)}
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Correo electrónico</Text>
                        <View style={styles.viewInput}>
                            <Mail color="#cbd5e1" size={20} />
                            <TextInput
                                placeholder="Escribe tu email"
                                placeholderTextColor="#000"
                                keyboardType="email-address"
                                style={styles.campoInput}
                                value={form.email}
                                onChangeText={(v) => handleChange("email", v)}
                            />
                        </View>
                    </View>

                    {/* Teléfono */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Teléfono</Text>
                        <View style={styles.viewInput} >
                            <Phone color="#cbd5e1" size={20} />
                            <TextInput
                                placeholder="Escribe tu teléfono"
                                placeholderTextColor="#000"
                                keyboardType="phone-pad"
                                style={styles.campoInput}
                                value={form.telefono}
                                onChangeText={(v) => handleChange("telefono", v)}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Observaciones</Text>
                        <View style={styles.viewInput} >
                            <DecimalsArrowRight color="#cbd5e1" size={20} />
                            <TextInput
                                placeholder="Escribe las observaciones"
                                placeholderTextColor="#000"
                                keyboardType="phone-pad"
                                style={styles.campoInput}
                                value={form.observaciones}
                                onChangeText={(v) => handleChange("observaciones", v)}
                            />
                        </View>
                    </View>

                    {/* Botón Guardar */}
                    <TouchableOpacity onPress={guardarProspecto}
                        style={{
                            backgroundColor: "#0067c6",
                            paddingVertical: 15,
                            borderRadius: 12,
                            alignItems: "center",
                            marginTop: 10,
                            marginBottom: 40
                        }}
                    >
                        <Text style={{ color: "#000", fontSize: 18, fontWeight: "700", }}>
                            Guardar cambios
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("DetalleCliente", { item: route.params.item.id }) }}
                        style={{
                            backgroundColor: "#c60000ff",
                            paddingVertical: 15,
                            borderRadius: 12,
                            alignItems: "center",
                            marginTop: 10,
                            marginBottom: 40
                        }}
                    >
                        <Text style={{ color: "#000", fontSize: 18, fontWeight: "700", }}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default EditarCliente;

const styles = StyleSheet.create({
    inputContainer: {},
    keyBoard: {
        width: '95%'
    },
    safeArea: {
        backgroundColor: "#FFF"
    },
    scroll: {
        paddingHorizontal: 25, paddingTop: 0
    },
    titulo: {
        color: "#000",
        fontSize: 32,
        fontWeight: "800",
        marginBottom: 25,
    },
    secondaryTitulo: {
        color: "#000",
        fontSize: 25,
        fontWeight: "800",
        marginBottom: 25,
    },
    label: { fontSize: 16, marginBottom: 8 },
    selector: {
        borderColor: '#000',
        backgroundColor: "#797b7dff",
        borderRadius: 12
    },
    result: { marginTop: 10, fontSize: 18, fontWeight: "600" },
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
    },
})