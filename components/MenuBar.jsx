import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const nido = require("../assets/nido.png");
const gastos = require("../assets/gastos.png");
const pagos = require("../assets/pagos.png");
const inicio = require("../assets/inicio.png");

export default function TopBar({ setCurrentView }) {
  const [showNidoOptions, setShowNidoOptions] = useState(false);
  const [showPagoOptions, setShowPagoOptions] = useState(false);

  const handleNidoPress = () => {
    setShowNidoOptions(!showNidoOptions);
  };
  const handlePagoPress = () => {
    setShowPagoOptions(!showPagoOptions);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCurrentView("inicio")}
      >
        <Image source={inicio} style={styles.logo} />
        <Text style={styles.buttonText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCurrentView("pagos")}
      >
        <Image source={pagos} style={styles.logo} />
        <Text style={styles.buttonText}>Pagos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePagoPress}>
        <Image source={gastos} style={styles.logo} />
        <Text style={styles.buttonText}>Gastos</Text>
      </TouchableOpacity>

      {showPagoOptions && (
        <View style={styles.gastosContainer}>
          <TouchableOpacity
            onPress={() => {
              setCurrentView("service");
              setShowPagoOptions(false);
            }}
          >
            <Text style={styles.optionText}>Servicios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentView("pantry");
              setShowPagoOptions(false);
            }}
          >
            <Text style={styles.optionText}>Despensa</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleNidoPress}>
        <Image source={nido} style={styles.logo} />
        <Text style={styles.buttonText}>Nido</Text>
      </TouchableOpacity>

      {showNidoOptions && (
        <View style={styles.nidoContainer}>
          <TouchableOpacity
            onPress={() => {
              setCurrentView("createNido");
              setShowNidoOptions(false);
            }}
          >
            <Text style={styles.optionText}>Crear Nido</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentView("viewNido");
              setShowNidoOptions(false);
            }}
          >
            <Text style={styles.optionText}>Ver Nido</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "end",
    backgroundColor: "#f15555",
    paddingVertical: 5,
    width: Dimensions.get("window").width,
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  logo: {
    width: 25,
    height: 25,
  },
  nidoContainer: {
    position: "absolute",
    top: -70,
    left: Dimensions.get("window").width * 0.75,
    backgroundColor: "#f15555",
    borderRadius: 5,
    padding: 5,
    zIndex: 1000,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    width: "25%",
  },
  optionText: {
    color: "white",
    padding: 5,
  },
  gastosContainer: {
    position: "absolute",
    top: -70,
    left: Dimensions.get("window").width * 0.5,
    backgroundColor: "#f15555",
    borderRadius: 5,
    padding: 5,
    zIndex: 1000,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    width: "25%",
  },
});
