import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { ref, onValue, off, push } from "firebase/database";
import { database } from "./firebase";

export const prospectoApi = createApi({
  /*reducerPath: "prospectoApi",
  baseQuery: fakeBaseQuery(), // Usamos fakeBaseQuery para manejar manualmente la lógica de Firebase
  tagTypes: ["Prospectos"],
  endpoints: (builder) => ({
    getProspectos: builder.query({
      queryFn: () => ({ data: [] }), // queryFn dummy inicial, los datos reales se gestionan en onCacheEntryAdded

      // --- Lógica MÁGICA del tiempo real ---
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // Obtenemos la referencia de la base de datos
        const contactosRef = ref(database, "prospecto");

        try {
          await cacheDataLoaded;

          // Suscripción en tiempo real de Firebase (onValue)
          const unsubscribe = onValue(contactosRef, (snapshot) => {
            const datos = snapshot.val();
            // Formateamos los datos de objeto a array con IDs para React Native
            //console.log("prospectoService", datos);
            
            const listaFormateada = datos
              ? Object.entries(datos).map(([id, data]) => ({ id, ...data }))
              : [];

            // Actualizamos la caché de RTK Query con los nuevos datos
            updateCachedData(() => listaFormateada);
          });

          // Cuando el componente deja de usarse, nos desuscribimos de Firebase
          await cacheEntryRemoved;
          off(contactosRef, "value", unsubscribe);
        } catch (error) {
          // Manejo de errores si es necesario
          console.error("Streaming error:", error);
        }
      },
      providesTags: ["Prospectos"],
    }),

    // --- Endpoint para Subir Información (Mutación) ---
    postProspecto: builder.mutation({
      async queryFn({
        localId,
        empresa,
        domicilio,
        contacto,
        telefono,
        email,
        observaciones,
        estado
      }) {
        try {
          const contactosRef = ref(database, "prospecto");
          // Usamos push() de Firebase para añadir datos y obtener un ID automático
          const nuevoContacto={
            empresa,
            domicilio,
            contacto,
            telefono,
            email,
            observaciones,
            localId,
            estado,
            fecha: new Date().toISOString(),
          }
          await push(contactosRef, nuevoContacto);
          return { data: nuevoContacto }; // RTK Query espera este formato de retorno
        } catch (error) {
          return { error: error.message };
        }
      },
      // Invalida la etiqueta 'Contactos' para que la consulta 'getContactos' se actualice automáticamente
      invalidatesTags: ["Prospectos"],
    }),
  }),*/
  reducerPath: "prospectoApi",
  baseQuery:fetchBaseQuery({baseUrl:'https://inicio-sesion-firebase-2d131-default-rtdb.firebaseio.com/'}),
    endpoints:(builder)=>({
        putProspecto:builder.mutation({
            query:({id,campos})=>({
                url:`prospecto/${id}.json`,
                method:"PATCH",
                body:campos
            }),
            
        }),
        postProspecto:builder.mutation({
            query:(datos)=>({
                url:`prospecto.json`,
                method:"POST",
                body:{
                    empresa:datos.empresa,domicilio:datos.domicilio,contacto:datos.contacto,telefono:datos.telefono,email:datos.telefono,observaciones:datos.observaciones,localId:datos.localId,estado:datos.estado,fecha:new Date().toISOString(),ubicacion:""
                }
                
            }),
            
        }),
        getProspectoById:builder.query({
            query:(localId)=>`prospecto/${localId}.json`
        }),
        getProspectos:builder.query({
            query:()=>`prospecto.json`,
            transformResponse: (res) => {
                if (!res) return [];
                return Object.keys(res).map((id) => ({
                    id,
                    ...res[id],
                }));
            },
        })
    })
});

export const {
  usePutProspectoMutation,
  useGetProspectoByIdQuery,
  useGetProspectosQuery,
  usePostProspectoMutation,
} = prospectoApi;
