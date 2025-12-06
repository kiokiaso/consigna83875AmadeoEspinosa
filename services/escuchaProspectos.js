import { onValue, ref,off } from "firebase/database";
import { db } from "./firebase";
import { firebaseApi } from "./obtenerProspecto";
import { setProspecto } from "../features/prospecto/prospectoSlice";

/**
 * Inicia escucha en tiempo real y actualiza el cache de RTK Query.
 * @param {Store} store - Redux store
 * @returns {function} cancelar listener
 */
export const escuchaProspectos = (store,localId) => {
  const crmRef = ref(db, "prospecto");

  const callback = (snapshot) => {
    const raw = snapshot.val() || {};
    const arr = Object.keys(raw).map((k) => ({ id: k, ...raw[k] }));

    // 1) actualizar cache de RTK Query para getAllCRMOnce
    try {
      store.dispatch(
        firebaseApi.util.updateQueryData("getProspectos", undefined, () => arr)
      );
    } catch (e) {
      console.warn("updateQueryData fallo:", e);
    }

    // 2) actualizar nuestro slice (dispatch)
     const resultado=arr.filter(u=>u.localId===localId)
    store.dispatch(setProspecto(resultado));
  };

  // Iniciar escucha
  onValue(crmRef, callback, (err) => {
    console.error("Firebase onValue error:", err);
  });

  // Stop function
  const stop = () => {
    try {
      off(crmRef, "value", callback);
    } catch (e) {
      try { off(crmRef); } catch (_) {}
    }
  };

  return stop;
};
