import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location'
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../../features/prospecto/prospectoSlice";
import MapView, { Marker } from "react-native-maps";
import { actualizarProspecto } from "../../../features/prospecto/prospectoSlice";
import { usePutProspectoMutation } from "../../../services/prospectoService";
import { FontAwesome } from "@expo/vector-icons";
import { ArrowBigLeft, Pencil } from "lucide-react-native";

const DetalleProspecto = ({ route, navigation }) => {

    const {
        id,
        empresa,
        contacto,
        domicilio,
        telefono,
        observaciones,
        email,
        ubicacion,
    } = useSelector(state => state.prospectoReducer.lista.find(p => p.id === route.params.item.id));
    const [location, setLocation] = useState(ubicacion)
    const [actProsFir] = usePutProspectoMutation()
    const dispatch = useDispatch();
    // Si viene del mapa, guardamos en Redux
    //console.log(route)
    useEffect(() => {
        const selectedLocation = route.params.selectedLocation
        if (selectedLocation) {
            dispatch(actualizarProspecto({
                id: id,
                cambios: {
                    ubicacion: selectedLocation
                }
            }));
            actProsFir({ id: id, campos: { ubicacion: selectedLocation } })
            setLocation(selectedLocation)
            Alert.alert("Ubicación seleccionada", "La ubicación se ha actualizado.");
        }
    }, [route.params.selectedLocation]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.titulo}>
                Datos del prospecto
            </Text>
            {/* Botones principales */}
            <View style={styles.topButtons}>

                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate("Prospectos")}>
                    <ArrowBigLeft color="#FFF" />
                    <Text style={styles.buttonText}>Regresar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate("EditarProspecto", {
                    item: route.params.item
                })} >
                    <Pencil color="#FFF" />
                    <Text style={styles.buttonText}>Editar </Text>
                </TouchableOpacity>

            </View>

            {/* Card */}
            <View style={styles.card}>
                <InfoItem label="Empresa" value={empresa} />
                <InfoItem label="Contacto" value={contacto} />
                <InfoItem label="Domicilio" value={domicilio} />
                <InfoItem label="Teléfono" value={telefono} />
                <InfoItem label="Email" value={email} />
                <InfoItem label="Observaciones" value={observaciones} />
            </View>
            {/* Botón para crear oportunidad */}
            <TouchableOpacity onPress={() => navigation.navigate("CrearOportunidad", {
                item: route.params.item
            })} style={styles.btnOporunidad}>
                <MaterialIcons name="trending-up" size={24} color="white" />
                <Text style={styles.btnText}>Crear Oportunidad</Text>
            </TouchableOpacity>

            {/* Botón para ubicación */}
            <TouchableOpacity onPress={() => navigation.navigate("ElegirUbicacion", {
                item: route.params.item
            })} style={styles.btnLocation}>
                <MaterialIcons name="location-on" size={24} color="white" />
                <Text style={styles.btnText}>Agregar ubicación</Text>
            </TouchableOpacity>
            {/* Mini mapa con ubicación seleccionada */}
            {location && (
                <View style={styles.mapWrapper}>
                    <Text style={styles.mapTitle}>Ubicación seleccionada</Text>
                    <MapView
                        style={styles.miniMap}
                        provider="google"
                        initialRegion={{
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: location.lat, longitude: location.lng }}
                        />
                    </MapView>
                </View>
            )}
        </ScrollView>
    );
}
function InfoItem({ label, value }) {
    return (
        <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value || "—"}</Text>
        </View>
    );
}

export default DetalleProspecto;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: "#F5F6FA",
    },
    content: {
        padding: 20,
        paddingBottom: 80, // espacio para evitar que el footer/tab tape contenido
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        color: "#2C2C2C",
    }, titulo: {
        color: "#000",
        fontSize: 32,
        fontWeight: "800",
        marginBottom: 25
    },
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
        marginBottom: 25,
    },
    infoItem: {
        marginBottom: 20,
    },
    infoLabel: {
        color: "#8A8A8A",
        fontSize: 14,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2C2C2C",
        lineHeight: 24,
    },
    btnLocation: {
        backgroundColor: "#007bff",
        paddingVertical: 16,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#007bff",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        elevation: 6,
    },
    btnOporunidad: {
        backgroundColor: "#11a347ff",
        paddingVertical: 16,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#007bff",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        elevation: 6,
        marginBottom: 10
    },
    btnText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10,
    },

    // mini mapa
    mapWrapper: { marginBottom: 30 },
    mapTitle: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    miniMap: {
        width: "100%",
        height: 200,
        borderRadius: 18,
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

});

