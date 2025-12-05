
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function UbicacionCliente({ navigation,route }) {
  const [selected, setSelected] = useState(null);
   const item = route.params.item;

  const confirmLocation = () => {
    if (!selected) return;
    navigation.navigate("DetalleCliente", { item: item,selectedLocation:selected});
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setSelected({ lat: latitude, lng: longitude });
        }}
      >
        {selected && (
          <Marker
            coordinate={{ latitude: selected.lat, longitude: selected.lng }}
          />
        )}
      </MapView>

      <TouchableOpacity
        style={[styles.btn, { opacity: selected ? 1 : 0.5 }]}
        disabled={!selected}
        onPress={confirmLocation}
      >
        <Text style={styles.btnText}>Confirmar ubicación</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  btn: {
    backgroundColor: "#007bff",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "white", fontSize: 18, fontWeight: "600" },
});
