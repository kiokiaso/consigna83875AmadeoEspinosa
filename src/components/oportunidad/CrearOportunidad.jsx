import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Component, DecimalsArrowRight,Info } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { usePutProspectoMutation } from "../../../services/prospectoService";
import Toast from 'react-native-toast-message'
import { actualizarProspecto } from "../../../features/prospecto/prospectoSlice";
import ModalSelector from 'react-native-modal-selector'

const CrearOportunidad = ({ navigation, route }) => {
    const [form, setForm] = useState({ monto: "", modelo: "", observaciones: "" });
    const dispatch = useDispatch()
    const [triggerPutOportunidad, result] = usePutProspectoMutation()
    const [tipo, setTipo] = useState("Elige un tipo")
    const [estado, setEstado] = useState("Elige el estado de equipo")
    const [tamano, setTamano] = useState("Elige un tamaño")
    const [marca, setMarca] = useState("Elige la marca")
    const [tipoMFP, setTipoMFP] = useState("Elige el tipo de MFP")

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
    const crearOportunidad = () => {
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
            const res = triggerPutOportunidad({
                id: route.params.item.id,
                campos:
                {
                    estado: "Oportunidad",
                    monto: form.monto,
                    modelo: form.modelo,
                    observaciones: form.observaciones,
                    tipo: tipo,
                    estadoOportunidad: estado,
                    marca: marca,
                    tamano: tamano,
                    tipoMFP: tipoMFP
                }
            })
            dispatch(actualizarProspecto({
                id: route.params.item.id,
                cambios: {
                    estado: "Oportunidad",
                    monto: form.monto,
                    modelo: form.modelo,
                    observaciones: form.observaciones,
                    tipo: tipo,
                    estadoOportunidad: estado,
                    marca: marca,
                    tamano: tamano,
                    tipoMFP: tipoMFP
                }
            }));
            navigation.navigate("DetalleProspecto", { item: route.params.item })

        });
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
                        Crear Oportunidad
                    </Text>
                    {/* Lista de selección tipo */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Selecciona el tipo de oportunidad </Text>
                        <View >
                            <ModalSelector
                                data={datosTipo}
                                initValue={tipo}
                                onChange={(option) => setTipo(option.value)}
                                style={styles.selector}
                            />
                        </View>
                        {/*tipo && (
                                <Text style={styles.result}>Seleccionaste: {tipo}</Text>
                            )*/}
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Estado del equipo </Text>
                        <View>
                            <ModalSelector
                                data={datosEstado}
                                initValue={estado}
                                onChange={(option) => setEstado(option.value)}
                                style={styles.selector}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Estado Tamaño del papel </Text>
                        <View >
                            <ModalSelector
                                data={datosTamano}
                                initValue={tamano}
                                onChange={(option) => setTamano(option.value)}
                                style={styles.selector}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Selecciona la marca</Text>
                        <View >
                            <ModalSelector
                                data={datosMarca}
                                initValue={marca}
                                onChange={(option) => setMarca(option.value)}
                                style={styles.selector}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Selecciona el Tipo de MFP</Text>
                        <View >
                            <ModalSelector
                                data={datosTipoMFP}
                                initValue={tipoMFP}
                                onChange={(option) => setTipoMFP(option.value)}
                                style={styles.selector}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Modelo </Text>
                        <View style={styles.viewInput}>
                            <Component color="#cbd5e1" size={20} />
                            <TextInput
                                placeholder="Modelo"
                                placeholderTextColor="#000"
                                style={styles.campoInput}
                                value={form.modelo}
                                onChangeText={(v) => handleChange("modelo", v)}
                            />
                        </View>
                    </View>

                    {/* Monto */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Monto</Text>
                        <View style={styles.viewInput} >
                            <DecimalsArrowRight color="#cbd5e1" size={20} />
                            <TextInput
                                placeholder="Escribe el monto"
                                placeholderTextColor="#000"
                                keyboardType="phone-pad"
                                style={styles.campoInput}
                                value={form.monto}
                                onChangeText={(v) => handleChange("monto", v)}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.nombreCampo}>Observaciones</Text>
                        <View style={styles.viewInput} >
                            <Info color="#cbd5e1" size={20} style={{ marginTop: 12 }} />
                            <TextInput
                                placeholder="Escribe las observaciones"
                                placeholderTextColor="#000"
                                style={styles.campoInput}
                                value={form.observaciones}
                                onChangeText={(v) => handleChange("observaciones", v)}
                            />
                        </View>
                    </View>

                    {/* Botón Guardar */}
                    <TouchableOpacity onPress={crearOportunidad}
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
                            Crear
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate("DetalleProspecto", {
                            item: route.params.item
                        })
                    }}
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

export default CrearOportunidad;

const styles = StyleSheet.create({
    inputContainer: {},
    keyBoard: {
        width: '95%'
    },
    safeArea: { backgroundColor: "#FFF" },
    scroll: { paddingHorizontal: 25, paddingTop: 0 },
    titulo: {
        color: "#000",
        fontSize: 32,
        fontWeight: "800",
        marginBottom: 25
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