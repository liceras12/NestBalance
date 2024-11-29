import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const getNidoId = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user is logged in.");
    return null;
  }

  try {
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const nidos = userDoc.data().nidos;
      // Buscar el primer nido en estado true
      const activeNidoId = Object.keys(nidos).find(
        (nidoId) => nidos[nidoId].estado,
      );

      if (activeNidoId) {
        return activeNidoId;
      } else {
        console.error("No active nido found.");
        return null;
      }
    } else {
      console.error("User document does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving nidoId:", error);
    return null;
  }
};
