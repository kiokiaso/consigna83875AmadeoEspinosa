# Proceso de venta

Este proyecto fue  hecho para el proceso de ventas, registrar Prospectos, Oportunidades y clientes

![captura](/assets/pantalla.png)

## Instalación
Para la instalación debes seguir los siguientes pasos

```bash
git https://github.com/kiokiaso/consigna83875AmadeoEspinosa.git
cd consigna83875AmadeoEspinosa
npm install
npm run dev
```

## Características
- Fácil de usar
- Interfaz amigable
- Soporte multiplataforma
- Para poder ver el mapa en el app es necesario tener una API de google, no incluida

## Uso
### Inicio de sesión y perfil
- Debes tener una API de google y ponerla en al app.json en la parte de IOS y Android referente a la API
- Primero se debe iniciar sesión, si no tienes un cuenta, te puedes registrar
- Una vez iniciada la sesión, puedes agregar los datos de tu perfil, o modificar la imagen presionando en Cambia Foto
### Prospectos
- Para el buen funcionamiento del app, primero debes crear un prospecto, entrando a Prospectos
- En este apartado te aparecerá la lista de prospectos, puedes regresar al Home, Agregar Prospecto o buscar y si ya tienes prospectos puedes ver el Detalle presionando en le ojito en cada fila
- Para agregar un prospecto presionas en Agregar, llenas el formulario y das en Agregar
- En el detalle de prospecto, puedes ver la información completa, además de, Editar la información, agregar una ubicación o Crear una oportunidad
- Para Editar, presionas el botón Editar y llenas el formulario, después presionas en Guardar Cambios
- Para agregar una oportunidad, presionas en Crear Oportunidad, llenas le formulario y das en Crear

### Oportunidades
- Presionas en el botón de Oportunidades de la pantalla principal
- Muestra la lista igual que en prospectos, la diferencia de esta pantalla es que no puedes agregar oportunidades, lo demás, el funcionamiento es igual a prospectos.
- La diferencia en Detalle de oportunidad es que puedes Crear una venta, para ello, presionas en Crear Venta y editas el formulario, una vez realizado esto, presionas en Crear

### Cliente
- Presionas en el botón clientes de la pantalla principal
- Funciona de la misma forma que oportunidades, la diferencia es que no puedes crear ventas, tampoco oportunidades.

### Cerrar sesión
- Sirve para cerrar la sesión

# 📦 Dependencias del Proyecto

Este proyecto utiliza diversas librerías de React Native y Expo.  
A continuación se muestra una descripción de cada dependencia, su propósito y enlace a la documentación oficial.

---

## 🎨 Iconos y UI

### **@expo/vector-icons**
🔗 https://docs.expo.dev/guides/icons/  
Colección de íconos lista para usar en Expo (Ionicons, MaterialIcons, FontAwesome, etc.).

### **lucide-react**
🔗 https://lucide.dev/guide/packages/lucide-react  
Iconos modernos para aplicaciones React (web).

### **lucide-react-native**
🔗 https://lucide.dev/guide/packages/lucide-react-native  
Versión para React Native de los iconos Lucide.

### **react-native-vector-icons**
🔗 https://github.com/oblador/react-native-vector-icons  
Colección de íconos nativos con soporte para múltiples tipos de fuentes.

### **react-native-toast-message**
🔗 https://github.com/calintamas/react-native-toast-message  
Permite mostrar notificaciones tipo Toast en la aplicación.


---

## 🧭 Navegación

### **@react-navigation/native**
🔗 https://reactnavigation.org/docs/getting-started  
Librería principal para navegación en React Native.

### **@react-navigation/native-stack**
🔗 https://reactnavigation.org/docs/native-stack-navigator  
Stack Navigator optimizado basado en vistas nativas.

### **@react-navigation/bottom-tabs**
🔗 https://reactnavigation.org/docs/bottom-tab-navigator  
Para implementar pestañas inferiores (Bottom Tab Navigation).

### **react-native-screens**
🔗 https://github.com/software-mansion/react-native-screens  
Optimiza el rendimiento de la navegación usando vistas nativas.

### **react-native-safe-area-context**
🔗 https://github.com/th3rdwave/react-native-safe-area-context  
Maneja áreas seguras como notch, barras y bordes.

---

## 🗺️ Mapas y Ubicación

### **react-native-maps**
🔗 https://github.com/react-native-maps/react-native-maps  
Mapas nativos para Android e iOS (Google Maps / Apple Maps).

### **expo-location**
🔗 https://docs.expo.dev/versions/latest/sdk/location/  
Para obtener la ubicación del dispositivo y permisos relacionados.

---

## 📷 Cámara y Archivos

### **expo-camera**
🔗 https://docs.expo.dev/versions/latest/sdk/camera/  
Permite usar la cámara del dispositivo para fotos o video.

### **expo-file-system**
🔗 https://docs.expo.dev/versions/latest/sdk/filesystem/  
Trabajar con archivos locales: leer, escribir, mover, borrar.


## 🗄️ Almacenamiento y Bases de Datos

### **expo-sqlite**
🔗 https://docs.expo.dev/versions/latest/sdk/sqlite/  
Base de datos SQLite integrada para almacenamiento local.

### **firebase**
🔗 https://firebase.google.com/docs  
SDK para Firebase: Firestore, Realtime Database, Auth, Storage, etc.

---

## 🛠️ Estado Global y Redux

### **@reduxjs/toolkit**
🔗 https://redux-toolkit.js.org/  
Herramientas simplificadas para crear slices, reducers y RTK Query.

### **react-redux**
🔗 https://react-redux.js.org/  
Conecta Redux con componentes React Native.

---

## ⚙️ Expo y React Native

### **expo**
🔗 https://docs.expo.dev/  
Framework para desarrollar apps en React Native con herramientas optimizadas.

### **expo-status-bar**
🔗 https://docs.expo.dev/versions/latest/sdk/status-bar/  
Permite manejar la barra de estado fácilmente.

### **react**
🔗 https://react.dev/  
Librería base para interfaces de usuario.

### **react-native**
🔗 https://reactnative.dev/  
Framework para construir aplicaciones móviles nativas con React.

---

## 📋 Selectores

### **react-native-modal-selector**
🔗 https://github.com/peacechen/react-native-modal-selector  
Selector tipo modal, ideal para listas de opciones en móviles.

---

## Licencia
Es de libre uso y disponible para colaboración


## Desarollo
Amadeo Espinosa

