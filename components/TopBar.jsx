import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { LogoInvertido } from "./LogoInvertido";

const icon = require("../assets/nestBalance.png");
const bird = require("../assets/bird.png");

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.content1}>
        <Text style={styles.text}>NestBalance</Text>
      </View>
      <View style={styles.content2}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={bird}
            style={styles.logo}
            width={100}
            height={100}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f15555",
    paddingVertical: 2,
    width: Dimensions.get("window").width,
    paddingHorizontal: 25,
  },
  content1: {
    flexDirection: "row",
    alignItems: "first",
  },
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "curvy",
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
  logo: {
    width: 50,
    height: 50,
  },
});
