import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);
const nidosCollection = collection(db, "nidos");

export const getNidoId = async () => {
  try {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user logged in.");
    }

    const q = query(
      nidosCollection,
      where("integrante.userId", "==", user.uid),
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs[0].id; // Devuelve el id del primer nido encontrado
    }

    throw new Error("No active nido found for user.");
  } catch (error) {
    console.error("Error fetching nidoId:", error);
    throw error;
  }
};
