import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useCountryAutocomplete } from "../hooks/useCountryAutocomplete";
import { createAccount } from "../services/authService";

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [año, setAño] = useState("");
  const {
    pais,
    setPais,
    filteredCountries,
    handleCountryInput,
    sexo,
    setSexo,
    selectCountry,
  } = useCountryAutocomplete();

  const handleCreateAccount = async () => {
    const personaData = {
      apellido,
      celular: parseInt(celular),
      ci,
      estado: true,
      fechaNacimiento: new Date(año, mes - 1, dia),
      nombre,
      pais,
      sexo,
    };

    const usuarioData = {
      correoElectronico: email,
      imagen:
        "https://drive.google.com/file/d/1PX1nycoUIjmtv3BEG5cH9PO3EBU20yZr/view?usp=sharing",
      usuario,
    };

    const result = await createAccount(
      email,
      password,
      personaData,
      usuarioData,
    );

    if (result.success) {
      Alert.alert("Account created successfully");
      navigation.replace("Main");
    } else {
      Alert.alert("Error", result.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Create a basic account</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.text}>Create a complete account</Text>
        <TextInput
          placeholder="CI/DNI"
          value={ci}
          onChangeText={setCi}
          style={styles.input}
        />
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <TextInput
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
          style={styles.input}
        />
        <TextInput
          placeholder="Celular"
          value={celular}
          onChangeText={setCelular}
          style={styles.input}
        />
        <TextInput
          placeholder="País"
          value={pais}
          onChangeText={handleCountryInput}
          style={styles.input}
        />
        {filteredCountries.length > 0 && (
          <FlatList
            data={filteredCountries}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => selectCountry(item)}>
                <View style={styles.dropdownItem}>
                  <Text>{item}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item}
            style={styles.dropdown}
          />
        )}
        <View style={styles.subContainer}>
          <Text style={styles.miniText}>Nacimiento </Text>
          <TextInput
            placeholder="dia"
            value={dia}
            onChangeText={setDia}
            style={styles.miniInput}
          />
          <TextInput
            placeholder="mes"
            value={mes}
            onChangeText={setMes}
            style={styles.miniInput}
          />
          <TextInput
            placeholder="año"
            value={año}
            onChangeText={setAño}
            style={styles.miniInput}
          />
        </View>
        <RNPickerSelect
          onValueChange={(value) => setSexo(value)}
          items={[
            { label: "Masculino", value: "masculino" },
            { label: "Femenino", value: "femenino" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Selecciona sexo", value: null }}
          value={sexo}
        />
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ff5463",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "end",
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "curvy",
  },
  miniText: {
    color: "black",
    fontSize: 15,
    fontWeight: "curvy",
  },
  input: {
    height: 40,
    borderColor: "#8c8b83",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  miniInput: {
    height: 40,
    borderColor: "#8c8b83",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "white",
    width: 70,
    marginEnd: 10,
  },
  button: {
    backgroundColor: "#F5F5DC",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginEnd: 10,
    width: 120,
  },
  buttonText: { color: "black", fontWeight: "bold" },
  dropdown: {
    maxHeight: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#8c8b83",
    borderWidth: 1,
    marginTop: -10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: "#8c8b83",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
    color: "black",
  },
  inputAndroid: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
    color: "black",
  },
});
