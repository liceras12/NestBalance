import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

// Fetch expenses data for a specific "gastoId"
export const fetchExpenses = async (gastoId) => {
  try {
    const docRef = doc(db, "gastos", gastoId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }
    return { servicio: {}, despensa: {} };
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

// Add a new item to "servicio" or "despensa"
export const addExpenseItem = async (gastoId, category, itemName, itemData) => {
  const docRef = doc(db, "gastos", gastoId);
  await updateDoc(docRef, {
    [`${category}.${itemName}`]: itemData,
  });
};

// Update an existing item
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

// Delete an item by marking it as inactive
export const deleteExpenseItem = async (gastoId, category, itemName) => {
  const docRef = doc(db, "gastos", gastoId);
  await updateDoc(docRef, {
    [`${category}.${itemName}.estado`]: false,
  });
};
