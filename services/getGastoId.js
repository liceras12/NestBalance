import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

export const getGastoId = async (nidoId) => {
  try {
    const nidoDoc = doc(db, "nidos", nidoId);
    const nidoSnapshot = await getDoc(nidoDoc);

    if (nidoSnapshot.exists()) {
      const libretaGastos = nidoSnapshot.data().libretaGastos || [];
      if (libretaGastos.length > 0) {
        return libretaGastos[libretaGastos.length - 1]; // Último ID de gasto
      }
    }

    throw new Error("No gastos found for nido.");
  } catch (error) {
    console.error("Error fetching gastoId:", error);
    throw error;
  }
};
