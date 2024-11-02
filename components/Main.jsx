//import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Logo } from "./Logo";
import TopBar from "./TopBar";
import MenuBar from "./MenuBar";

export function Main() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopBar />
      <View style={styles.contentContainer}>
        <Logo />
      </View>
      <MenuBar />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 60,
  },
});
