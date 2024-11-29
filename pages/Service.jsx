import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useExpenses } from "../hooks/useExpenses";

const Services = ({ nidoId }) => {
  const { expenses, loading, addItem, updateItem, deleteItem } =
    useExpenses(nidoId);
  const [name, setName] = React.useState("");
  const [costo, setCosto] = React.useState("");
  const [direccionFacturacion, setDireccionFacturacion] = React.useState("");
  const [type, setType] = React.useState("");

  if (loading) {
    return <ActivityIndicator size="100%" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} // Oculta la barra de scroll
        keyboardShouldPersistTaps="handled" // Permite que el scroll responda sobre inputs o botones
        alwaysBounceVertical={true} // Añade una experiencia de scroll suave
      >
        <Text style={styles.title}>Servicios</Text>
        {Object.keys(expenses.servicio)
          .filter((key) => expenses.servicio[key].estado)
          .map((service) => (
            <View key={service} style={styles.content}>
              <Text style={styles.list}>{service}</Text>
              <View>
                <View>
                  <Text>Costo: {expenses.servicio[service].costo}</Text>
                  <Text>
                    Dirección de facturación:{" "}
                    {expenses.servicio[service].direccionFacturacion}
                  </Text>
                </View>
                <View style={styles.barButtons}>
                  <TouchableOpacity
                    onPress={() => deleteItem("servicio", service)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteItem("servicio", service)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        <Text style={styles.title}>Nuevo Servicio</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
          placeholderTextColor="#8c8b83"
        />
        <Text style={styles.label}>Costo</Text>
        <TextInput
          style={styles.input}
          value={costo}
          onChangeText={setCosto}
          placeholder="Costo"
          placeholderTextColor="#8c8b83"
        />
        <Text style={styles.label}>Direccion de facturación</Text>
        <TextInput
          style={styles.input}
          value={direccionFacturacion}
          onChangeText={setDireccionFacturacion}
          placeholder="Direccion de facturación"
          placeholderTextColor="#8c8b83"
        />
        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="Tipo"
          placeholderTextColor="#8c8b83"
        />
        <Button
          title="Agregar Servicio"
          onPress={() =>
            addItem("servicio", "nuevoServicio", {
              costo: 100,
              direccionFacturacion: "Sin dirección",
              tipo: "variable",
              estado: true,
            })
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
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

export default Services;
