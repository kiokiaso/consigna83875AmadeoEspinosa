import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { ref, onValue, off, push,get,update } from "firebase/database";
import { db } from "./firebase";

export const prospectoApi = createApi({
  /*reducerPath: "prospectoApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProspectos: builder.query({
      async queryFn() {
        try {
          const snapshot = await get(ref(db, "prospecto"));
          const raw = snapshot.val() || {};
          const arr = Object.keys(raw).map((k) => ({ id: k, ...raw[k] }));
          return { data: arr };
        } catch (error) {
          return { error };
        }
      },
    }),

    postProspecto: builder.mutation({
      async queryFn(newItem) {
        try {
          // newItem is an object (without id)
          const listRef = ref(db, "prospecto");
          const pushedRef = await push(listRef, newItem); // push returns ref
          const id = pushedRef.key;
          // return created object with id
          return { data: { id, ...newItem } };
        } catch (error) {
          return { error };
        }
      },
    }),

    putProspecto: builder.mutation({
      async queryFn({ id, changes }) {
        try {
          const itemRef = ref(db, `prospecto/${id}`);
          await update(itemRef, changes);
          return { data: { id, ...changes } };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),*/
  reducerPath: "prospectoApi",
  tagTypes: ["Prospectos"],
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
    })
});

export const {
  usePutProspectoMutation,
  usePostProspectoMutation,
} = prospectoApi;
