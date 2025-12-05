import { StatusBar} from "expo-status-bar";
import { Provider } from 'react-redux'
import { store } from "./app/store"
import RootStack from "./navigation/RootStack";
import { SQLiteProvider } from "expo-sqlite";
import Toast from 'react-native-toast-message'




export const initializeDB=async (db)=>{ 
  //const db = await SQLite.openDatabaseAsync('sessions');

  try {
    await db.execAsync('CREATE TABLE IF NOT EXISTS sessions(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL,localId TEXT NOT NULL);');
    console.log("Base de datos inicializada")
  } catch (error) {
    console.log("Error al inicializar la base de datos: ",error)
  }
}

export default function App(){
  return (
    <SQLiteProvider databaseName="proyecto.db" onInit={initializeDB} >
      <Provider store={store}>
        <RootStack />
        <Toast />
        <StatusBar style="auto" />
      </Provider>
    </SQLiteProvider>
  )
}




/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
