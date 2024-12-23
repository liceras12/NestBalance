import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Logo } from "./Logo";
import TopBar from "./TopBar";

export function Main() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopBar />
      <View style={styles.contentContainer}>
        <Logo />
      </View>
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
