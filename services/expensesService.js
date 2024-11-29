import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);
const gastosCollection = collection(db, "gastos");

// Fetch expenses data for a specific "nido"
export const fetchExpenses = async (nidoId) => {
  try {
    const q = query(gastosCollection, where("nido", "==", nidoId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    return { servicio: {}, despensa: {} };
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error(error);
  }
};

// Add a new item to "servicio" or "despensa" map
export const addExpenseItem = async (gastoId, category, itemName, itemData) => {
  const docRef = doc(db, "gastos", gastoId);
  await updateDoc(docRef, {
    [`${category}.${itemName}`]: { ...itemData, estado: true },
  });
};

// Update an item in "servicio" or "despensa"
export const updateExpenseItem = async (
  gastoId,
  category,
  itemName,
  updateData,
) => {
  const docRef = doc(db, "gastos", gastoId);
  await updateDoc(docRef, {
    [`${category}.${itemName}`]: updateData,
  });
};

// Mark an item as inactive (estado: false)
export const deleteExpenseItem = async (gastoId, category, itemName) => {
  const docRef = doc(db, "gastos", gastoId);
  await updateDoc(docRef, {
    [`${category}.${itemName}.estado`]: false,
  });
};
