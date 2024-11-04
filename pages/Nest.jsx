import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../services/firebaseConfig";

const db = getFirestore(app);

export default function Nest() {
  const [nidoData, setNidoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNidoData = async () => {
      try {
        const nidoDoc = await getDoc(doc(db, "nidos", "ndO5Jy2kaTfZj3sff4wJ"));
        if (nidoDoc.exists()) {
          setNidoData(nidoDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching nido data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNidoData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ff5463" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nido: {nidoData.nombre}</Text>
      <Text>Description: {nidoData.descripcion}</Text>
      <Text>Location: {nidoData.ubicacion}</Text>
      <Text>Type: {nidoData.tipo}</Text>
      {/* Add more fields as needed */}
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
});
