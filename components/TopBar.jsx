import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LogoInvertido } from "./LogoInvertido";

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View>
        <LogoInvertido />
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Usuario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f15555",
    paddingVertical: 0.5,
    width: Dimensions.get("window").width,
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
