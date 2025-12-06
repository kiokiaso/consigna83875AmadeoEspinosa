

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GenericoScreen from '../screens/GenericoScreen';
import AdminUsersScreen from '../screens/AdminUsersScreen';
//import { useAuth } from '../services/authService';
import { useSelector } from "react-redux"
import ProfileScreen from './ProfileScreen';
import Prospectos from '../components/prospectos/Prospectos';
import DetalleProspecto from '../components/prospectos/DetalleProspecto';
import ElegirUbicacion from '../components/prospectos/ElegirUbicacion';
import EditarProspecto from '../components/prospectos/EditarProspecto';
import CrearOportunidad from '../components/oportunidad/CrearOportunidad';
import Oportunidad from '../components/oportunidad/Oportunidad';
import DetalleOportunidad  from '../components/oportunidad/DetalleOportunidad'
import EditarOportunidad  from '../components/oportunidad/EditarOportunidad'
import UbicacionOportunidad from '../components/oportunidad/UbicacionOportunidad';
import Cliente from '../components/cliente/Cliente'
import CrearCliente from '../components/cliente/CrearCliente';
import DetalleCliente from '../components/cliente/DetalleCliente';
import UbicacionCliente from '../components/cliente/UbicacionCliente';
import EditarCliente from '../components/cliente/EditarCliente';
import Datos from '../components/sincronizar/Datos';


const Stack = createNativeStackNavigator();


export default function AppScreen() {
    const user =useSelector(state=>state.authReducer.value.email)
    const isAdmin = user?.role === 'admin';


    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Prospectos" component={Prospectos}  options={{ headerShown: false }} />
            <Stack.Screen name="Clientes" component={GenericoScreen} />
            <Stack.Screen name="Ventas" component={GenericoScreen} />
            <Stack.Screen name="Inventario" component={GenericoScreen} />
            <Stack.Screen name="Contratos" component={GenericoScreen} />
            <Stack.Screen name="Calendario" component={GenericoScreen} />
            <Stack.Screen name="Perfil" component={ProfileScreen} />
            <Stack.Screen name="DetalleProspecto" component={DetalleProspecto}  options={{ headerShown: false }} />
            <Stack.Screen name="ElegirUbicacion" component={ElegirUbicacion}  options={{ headerShown: false }} />
            <Stack.Screen name="EditarProspecto" component={EditarProspecto}  options={{ headerShown: false }} />
            <Stack.Screen name="CrearOportunidad" component={CrearOportunidad}  options={{ headerShown: false }} />
            <Stack.Screen name="Oportunidad" component={Oportunidad}  options={{ headerShown: false }} />
            <Stack.Screen name="DetalleOportunidad" component={DetalleOportunidad}  options={{ headerShown: false }} />
            <Stack.Screen name="EditarOportunidad" component={EditarOportunidad}  options={{ headerShown: false }} />
            <Stack.Screen name="UbicacionOportunidad" component={UbicacionOportunidad}  options={{ headerShown: false }} />
            <Stack.Screen name="Cliente" component={Cliente}  options={{ headerShown: false }} />
            <Stack.Screen name="CrearCliente" component={CrearCliente}  options={{ headerShown: false }} />
            <Stack.Screen name="DetalleCliente" component={DetalleCliente}  options={{ headerShown: false }} />
            <Stack.Screen name="UbicacionCliente" component={UbicacionCliente}  options={{ headerShown: false }} />
            <Stack.Screen name="EditarCliente" component={EditarCliente}  options={{ headerShown: false }} />
            <Stack.Screen name="SincronizarDatos" component={Datos}  options={{ headerShown: false }} />


            {isAdmin && (
                <Stack.Screen name="AdminUsuarios" component={AdminUsersScreen} />
            )}
        </Stack.Navigator>
    );
}