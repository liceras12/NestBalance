import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Logo } from "./Logo";
import TopBar from "./TopBar";
import MenuBar from "./MenuBar";
import Nest from "../pages/Nest";
import CreateNestForm from "../pages/CreateNestForm";

export function Main() {
  const insets = useSafeAreaInsets();
  const [currentView, setCurrentView] = useState("inicio");
  const [showNidoOptions, setShowNidoOptions] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "createNido":
        return <CreateNestForm />;
      case "viewNido":
        return <Nest />;
      default:
        return <Logo />;
    }
  };

  const handleOutsidePress = () => {
    // Hide the options in MenuBar if visible
    setShowNidoOptions(false); // You may need to pass `setShowNidoOptions` as a prop from Main to MenuBar
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <TopBar />
        <View style={styles.contentContainer}>{renderView()}</View>
        <MenuBar setCurrentView={setCurrentView} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
