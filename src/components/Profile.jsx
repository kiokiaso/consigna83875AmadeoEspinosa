import React from 'react'
import { StyleSheet, Text, Image, Button, Dimensions, View, ScrollView,TouchableOpacity  } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {ArrowBigLeft} from "lucide-react-native"
import FontAwesome from '@expo/vector-icons/MaterialIcons';

const Profile = ({ form, datosPerfil, openCamera, email,logout }) => {
    //console.log(profile)
    return (
        <View style={{width:"95%"}}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.title}>Perfil de Usuario</Text>
            <View style={styles.avatarContainer}>
                {datosPerfil.profilePicture ? (
                    <Image
                        source={{ uri: datosPerfil.profilePicture }}
                        style={styles.avatar}
                    />
                ) : (
                    <View style={styles.letterCircle}>
                        <Text style={styles.letter}>{datosPerfil.nombre.charAt(0).toUpperCase()}</Text>
                    </View>
                )}
                <View style={{ marginTop: 10 }}>
                    <Button title="Cambiar Foto" onPress={openCamera} />
                </View>

                {/*<Pressable style={styles.cameraButton} onPress={openCamera}>
                    <Icon name="camera" size={24} color="#fff" />
                </Pressable>*/}
            </View>
            </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.value}>{datosPerfil.nombre}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.row}>
                    <Text style={styles.label}>Correo</Text>
                    <Text style={styles.value}>{email}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.row}>
                    <Text style={styles.label}>Teléfono</Text>
                    <Text style={styles.value}>{datosPerfil.telefono}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.bioBox}>
                    <Text style={styles.label}>Biografía</Text>
                    <Text style={styles.bio}>{datosPerfil.bio}</Text>
                </View>
            </View>
            <View style={{marginTop:10}}>
                 <TouchableOpacity style={styles.buttonBack} onPress={form} >
                    <FontAwesome name="edit" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Editar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={logout}>
                    <FontAwesome name="logout" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({

    //container: { alignItems: "center", padding: 20 },
    
    placeholder: { backgroundColor: "#ddd", justifyContent: "center", alignItems: "center" },
    name: { fontSize: 20, fontWeight: "600" },
    email: { color: "#444" },
    inputContainer: {},
    profileData: {},

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
    /** Avatar circular */
    avatarContainer: {
        width: 160,
        height: 160,
        alignItems: "center",
        justifyContent: "center",
    },

    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },

    letterCircle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: "#007AFF",
        alignItems: "center",
        justifyContent: "center",
    },

    letter: {
        fontSize: 70,
        fontWeight: "bold",
        color: "#fff",
    },

    /** Botón flotante sobre el avatar */
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 40,
        elevation: 4,
    },

    header: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    profileData: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },

    /** Cámara */
    camera: {
        width: "100%",
        height: "100%",
    },

    shutter: {
        position: "absolute",
        bottom: 40,
        width: 70,
        height: 70,
        backgroundColor: "#fff",
        borderRadius: 40,
        alignSelf: "center",
    },
    container: {
        backgroundColor: "#F8F9FB",
        width: '95%',
        marginTop: 40,
        marginBottom:40
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 20,
        color: "#1E1E1E",
        textAlign: "center",
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    row: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#7A7A7A",
        marginBottom: 4,
        fontWeight: "600",
    },
    value: {
        fontSize: 18,
        color: "#212121",
        fontWeight: "500",
    },
    separator: {
        height: 1,
        backgroundColor: "#E6E6E6",
        marginVertical: 10,
    },
    bioBox: {
        marginTop: 10,
    },
    bio: {
        fontSize: 16,
        color: "#444",
        marginTop: 6,
        lineHeight: 22,
    },
})