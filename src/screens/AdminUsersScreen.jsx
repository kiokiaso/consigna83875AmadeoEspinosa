import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function AdminUsersScreen() {
return (
<View style={styles.center}>
<Text style={{ fontSize: 20 }}>Panel de administración de usuarios</Text>
</View>
);
}


const styles = StyleSheet.create({ center: { flex: 1, justifyContent: 'center', alignItems: 'center' } });