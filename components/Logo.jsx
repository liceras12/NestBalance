import React from "react";
import { Image, StyleSheet } from "react-native";

const icon = require("../assets/logoNestBalance.png");
export function Logo() {
  return (
    <Image
      source={icon}
      style={styles.logo}
      width={100}
      height={100}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});
