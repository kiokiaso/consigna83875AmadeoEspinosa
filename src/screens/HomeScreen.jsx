import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MenuButton from '../components/MenuButton';
//import { useAuth } from '../services/authService';
import { useSelector } from "react-redux"


export default function MainScreen({ navigation }) {
    const user =useSelector(state=>state.authReducer.value.email)
    const isAdmin = user?.email === 'kio_kiaso@hotmail.com';


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Menú Principal</Text>
            <View style={styles.grid}>
                <MenuButton title="Prospectos" icon="person-add" onPress={() => navigation.navigate('Prospectos')} />
                <MenuButton title="Oportunidades" icon="trending-up" onPress={() => navigation.navigate('Oportunidad')} />
                <MenuButton title="Clientes" icon="groups" onPress={() => navigation.navigate('Cliente')} />
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