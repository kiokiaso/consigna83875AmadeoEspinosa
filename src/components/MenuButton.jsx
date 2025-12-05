import react from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MenuButton = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <MaterialIcons name={icon} size={36} color="#fff" />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

export default MenuButton

const styles = StyleSheet.create({
    button: {
        width: '46%',
        backgroundColor: '#1976D2',
        paddingVertical: 26,
        borderRadius: 18,
        alignItems: 'center',
        marginVertical: 8,
    },
    text: {
        marginTop: 8,
        color: '#fff',
        fontSize: 15,
        fontWeight: '600'
    }
})