import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { ref, onValue, off, push,get,update } from "firebase/database";
import { db } from "./firebase";

export const obtenerProspectoApi = createApi({
  reducerPath: "obtenerProspectoApi",
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
  }),
});

export const {
  useGetProspectosQuery,
} = obtenerProspectoApi;
