import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import app from "./firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

export const createAccount = async (
  email,
  password,
  personaData,
  usuarioData,
) => {
  try {
    // Crear y autenticar al usuario
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Si la autenticación es exitosa, guardar los datos en Firestore
    const personaRef = await addDoc(collection(db, "personas"), personaData);

    await addDoc(collection(db, "usuarios"), {
      ...usuarioData,
      personaId: personaRef.id,
      fechaCreacion: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error al crear la cuenta:", error);
    return { success: false, message: error.message };
  }
};
