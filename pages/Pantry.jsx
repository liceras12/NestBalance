import React from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useExpenses } from "../hooks/useExpenses";

const Pantry = ({ nidoId }) => {
  const { expenses, loading, addItem, updateItem, deleteItem } =
    useExpenses(nidoId);
  const [name, setName] = React.useState("");
  const [cantidad, setCantidad] = React.useState("");
  const [precioUnidad, setPrecioUnidad] = React.useState("");

  if (loading) {
    return <ActivityIndicator size="100%" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despensa</Text>
      {Object.keys(expenses.despensa)
        .filter((key) => expenses.despensa[key].estado)
        .map((item) => (
          <View key={item} style={styles.content}>
            <Text style={styles.list}>{item}</Text>
            <Text>Precio Unidad: {expenses.despensa[item].precioUnidad}</Text>
            <View style={styles.barButtons}>
              <TouchableOpacity
                onPress={() => deleteItem("despensa", item)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteItem("despensa", item)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      <Button
        title="Agregar Item"
        onPress={() =>
          addItem("despensa", "nuevoItem", {
            precioUnidad: 50,
            cantidad: 1,
            estado: true,
          })
        }
      />
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
        placeholderTextColor="#8c8b83"
      />
      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        style={styles.input}
        value={cantidad}
        onChangeText={setCantidad}
        placeholder="Cantidad"
        placeholderTextColor="#8c8b83"
      />
      <Text style={styles.label}>Precio por unidad</Text>
      <TextInput
        style={styles.input}
        value={precioUnidad}
        onChangeText={setPrecioUnidad}
        placeholder="Precio"
        placeholderTextColor="#8c8b83"
      />
      <Button
        title="Agregar Despensa"
        onPress={() =>
          addItem("despensa", "nuevoDespensa", {
            cantidad: 100,
            tipo: "variable",
            estado: true,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5463",
    margin: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  list: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 5,
    color: "white",
  },
  barButtons: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#F5F5DC",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    width: 100,
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
  },
  buttonText: { color: "black", fontSize: 17, fontWeight: "bold" },
  input: {
    height: 40,
    borderColor: "#8c8b83",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 250,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default Pantry;
