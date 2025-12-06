import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Mail, Phone, Info } from "lucide-react-native";
import { setProfile } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { usePutProfileSaveMutation } from "../../services/userService";

const EditProfile = ({ formulario, logout,datos,correo,imagen,localId }) => {
  const [form, setForm] = useState({ name:datos.nombre, email:correo, phone:datos.telefono, bio:datos.bio });
  const dispatch=useDispatch()
  const [triggerPutProfileSave,resultProfile]=usePutProfileSaveMutation()


  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }
  const guardarPerfil=()=>{
          //console.log(form)
          dispatch(setProfile({nombre:form.name,telefono:form.phone,bio:form.bio}))
          formulario()
          triggerPutProfileSave({nombre:form.name,telefono:form.phone,bio:form.bio,image:imagen,localId})
          //setEditarPerfil((prev)=>!prev)*/
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
            Editar Perfil
          </Text>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.nombreCampo}>Nombre completo</Text>
            <View style={styles.viewInput}>
              <User color="#cbd5e1" size={20} />
              <TextInput
                placeholder="Escribe tu nombre"
                placeholderTextColor="#000"
                style={styles.campoInput}
                value={form.name}
                onChangeText={(v) => handleChange("name", v)}
              />
            </View>
          </View>

          {/* Email */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.nombreCampo}>Correo electrónico</Text>
            <View style={styles.viewInput}>
              <Mail color="#cbd5e1" size={20} />
              <TextInput
                editable={false}
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
                value={form.phone}
                onChangeText={(v) => handleChange("phone", v)}
              />
            </View>
          </View>

          {/* Bio */}
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.nombreCampo}>Biografía</Text>
            <View style={styles.viewInput}  >
              <Info color="#cbd5e1" size={20} style={{ marginTop: 12 }} />
              <TextInput
                placeholder="Cuéntanos algo sobre ti"
                placeholderTextColor="#000"
                multiline
                numberOfLines={4}
                style={styles.campoInput}
                value={form.bio}
                onChangeText={(v) => handleChange("bio", v)}
              />
            </View>
          </View>

          {/* Botón Guardar */}
          <TouchableOpacity onPress={guardarPerfil}
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

          <TouchableOpacity onPress={formulario}
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

export default EditProfile;

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
  viewInput:{
                backgroundColor: "#797b7dff",
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
              },
              campoInput:{
                  flex: 1,
                  paddingVertical: 12,
                  marginLeft: 10,
                  color: "white"
                },
})