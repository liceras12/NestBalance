import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import app from "../services/firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

export default function CreateNestForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tipo, setTipo] = useState("");

  const handleCreateNest = async () => {
    try {
      const user = auth.currentUser;
      const newNest = {
        nombre,
        descripcion,
        ubicacion,
        tipo,
        estado: true,
        fechaCreacion: serverTimestamp(),
        integrante: {
          [user.uid]: ["administrador"],
        },
        gastos: [],
        pagos: "",
      };
      await addDoc(collection(db, "nidos"), newNest);
      alert("Nido creado exitosamente");
    } catch (error) {
      console.error("Error creando nido: ", error);
      alert("Error creando nido");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nido</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
      />
      <Button title="Crear Nido" onPress={handleCreateNest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
