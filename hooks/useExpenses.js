import { useState, useEffect } from "react";
import {
  fetchExpenses,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
} from "../services/expensesService";
import { getNidoId } from "../services/getNestId";
import { getGastoId } from "../services/getGastoId";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState({ servicio: {}, despensa: {} });
  const [loading, setLoading] = useState(true);
  const [nidoId, setNidoId] = useState(null);
  const [gastoId, setGastoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nido = await getNidoId();
        setNidoId(nido);

        const gasto = await getGastoId(nido);
        setGastoId(gasto);

        const data = await fetchExpenses(gasto);
        setExpenses(data);
      } catch (error) {
        console.error("Error initializing expenses data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addItem = async (category, itemName, itemData) => {
    if (!gastoId) return;
    try {
      await addExpenseItem(gastoId, category, itemName, itemData);
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
    if (!gastoId) return;
    try {
      await updateExpenseItem(gastoId, category, itemName, updateData);
      setExpenses((prev) => ({
        ...prev,
        [category]: { ...prev[category], [itemName]: updateData },
      }));
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (category, itemName) => {
    if (!gastoId) return;
    try {
      await deleteExpenseItem(gastoId, category, itemName);
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
