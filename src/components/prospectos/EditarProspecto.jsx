import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Mail, Phone, Info, Building2, MapPinHouse } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { usePutProspectoMutation } from "../../../services/prospectoService";
import Toast from 'react-native-toast-message'
import { actualizarProspecto } from "../../../features/prospecto/prospectoSlice";

const EditarProspecto = ({ navigation, route }) => {
    const [form, setForm] = useState({ empresa: route.params.item.empresa, domicilio: route.params.item.domicilio, email: route.params.item.email, telefono: route.params.item.telefono, observaciones: route.params.item.observaciones, contacto: route.params.item.contacto });
    const dispatch = useDispatch()
    const [triggerPostProspecto, result] = usePutProspectoMutation()


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
        const res = triggerPostProspecto({
            id: route.params.item.id,
            campos:
            {
                empresa: form.empresa,
                domicilio: form.domicilio,
                contacto: form.contacto,
                telefono: form.contacto,
                email: form.email,
                observaciones: form.observaciones,
            }
        })
        

       // altaProspecto.id = res.requestId
        //dispatch(addProspecto(altaProspecto))
        dispatch(actualizarProspecto({
            id: route.params.item.id,
            cambios: {
                empresa: form.empresa,
                domicilio: form.domicilio,
                contacto: form.contacto,
                telefono: form.telefono,
                email: form.email,
                observaciones: form.observaciones,
            }
        }));
        navigation.navigate("DetalleProspecto",{item:route.params.item})
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

                    {/* Bio */}
                    <View style={{ marginBottom: 25 }}>
                        <Text style={styles.nombreCampo}>Observaciones</Text>
                        <View style={styles.viewInput}  >
                            <Info color="#cbd5e1" size={20} style={{ marginTop: 12 }} />
                            <TextInput
                                placeholder="Más información del prospecto"
                                placeholderTextColor="#000"
                                multiline
                                numberOfLines={4}
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

                    <TouchableOpacity onPress={()=>{navigation.navigate("DetalleProspecto",{item:route.params.item})}}
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

export default EditarProspecto;

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