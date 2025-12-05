import { createSlice } from "@reduxjs/toolkit";

export const prospectoSlice = createSlice({
  name: "prospecto",
  initialState: {
    lista: [],
  },
  reducers: {
    setProspecto: (state, action) => {
      state.lista = action.payload;
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
    /*updateProspecto:(state,action)=>{
            const {id,data}=action.payload
        }*/
  },
});

export const { setProspecto, addProspecto,actualizarProspecto } = prospectoSlice.actions;
export default prospectoSlice.reducer;
