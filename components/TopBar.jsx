import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logout from "../services/logout";

const icon = require("../assets/nestBalance.png");
const bird = require("../assets/bird.png");

export default function TopBar({ setCurrentView }) {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const navigation = useNavigation();

  const handleUserPress = () => {
    setShowUserOptions(!showUserOptions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content1}>
        <Text style={styles.text}>NestBalance</Text>
      </View>
      <View style={styles.content2}>
        <TouchableOpacity style={styles.button} onPress={handleUserPress}>
          <Image
            source={bird}
            style={styles.logo}
            width={100}
            height={100}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {showUserOptions && (
          <View style={styles.nidoContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowUserOptions(false);
                logout(navigation);
              }}
            >
              <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowUserOptions(false);
              }}
            >
              <Text style={styles.optionText}>Opciones</Text>
            </TouchableOpacity>
          </View>
        )}
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
  nidoContainer: {
    position: "absolute",
    top: 60,
    //left: Dimensions.get("window").width * 0.75,
    backgroundColor: "#f15555",
    borderRadius: 5,
    padding: 5,
    zIndex: 1000,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    width: 100,
  },
  optionText: {
    color: "white",
    padding: 5,
  },
});
