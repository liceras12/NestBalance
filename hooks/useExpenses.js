import { useState, useEffect } from "react";
import {
  fetchExpenses,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
} from "../services/expensesService";
import { getNidoId } from "../services/getNestId";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState({ servicio: {}, despensa: {} });
  const [loading, setLoading] = useState(true);
  const [nidoId, setNidoId] = useState(null);

  useEffect(() => {
    const fetchNidoIdAndLoadExpenses = async () => {
      const id = await getNidoId();
      if (!id) {
        setLoading(false);
        return;
      }

      setNidoId(id);
      setLoading(true);

      try {
        const data = await fetchExpenses(id);
        setExpenses(data);
      } catch (error) {
        console.error("Error loading expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNidoIdAndLoadExpenses();
  }, []);

  const addItem = async (category, itemName, itemData) => {
    if (!nidoId) return;
    try {
      await addExpenseItem(nidoId, category, itemName, itemData);
      setExpenses((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [itemName]: { ...itemData, estado: true },
        },
      }));
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (category, itemName, updateData) => {
    if (!nidoId) return;
    try {
      await updateExpenseItem(nidoId, category, itemName, updateData);
      setExpenses((prev) => ({
        ...prev,
        [category]: { ...prev[category], [itemName]: updateData },
      }));
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (category, itemName) => {
    if (!nidoId) return;
    try {
      await deleteExpenseItem(nidoId, category, itemName);
      setExpenses((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [itemName]: { ...prev[category][itemName], estado: false },
        },
      }));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return { expenses, loading, addItem, updateItem, deleteItem };
};
