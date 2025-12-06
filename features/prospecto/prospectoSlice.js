import { createSlice } from "@reduxjs/toolkit";

export const prospectoSlice = createSlice({
  name: "prospecto",
  initialState: {
    lista: [],
    lastSync:null,
  },
  reducers: {
    setProspecto: (state, action) => {
      state.lista = action.payload;
      state.lastSyncAt = Date.now();
    },
    addProspecto: (state, action) => {
      state.lista.push(action.payload);
    },
    actualizarProspecto: (state, action) => {
      const { id, cambios } = action.payload;

      const index = state.lista.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.lista[index] = {
          ...state.lista[index], // datos existentes
          ...cambios, // nuevos valores
        };
      }
    },
    limpiarLista: (state) => {
      state.lista = [];
      state.lastSyncAt = null;
    }
  },
});

export const { setProspecto, addProspecto,actualizarProspecto,limpiarLista } = prospectoSlice.actions;
export default prospectoSlice.reducer;
