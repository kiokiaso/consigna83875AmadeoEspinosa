import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from "react-redux"


export default function GenericoScreen({ route }) {

    //const user =useSelector(state=>state)
    //console.log("User: ",user)
    console.log(route)
    return (
        <View style={styles.center}>
            <Text style={{ fontSize: 22 }}>{route.name}</Text>
        </View>
    );
}


const styles = StyleSheet.create({ center: { flex: 1, justifyContent: 'center', alignItems: 'center' } });