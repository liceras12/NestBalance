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
import Service from "../pages/Service";
import Pantry from "../pages/Pantry";

export function Main() {
  const insets = useSafeAreaInsets();
  const [currentView, setCurrentView] = useState("inicio");
  const [showNidoOptions, setShowNidoOptions] = useState(false);
  const [showPagoOptions, setShowPagoOptions] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "createNido":
        return <CreateNestForm />;
      case "viewNido":
        return <Nest />;
      case "service":
        return <Service />;
      case "pantry":
        return <Pantry />;
      default:
        return <Logo />;
    }
  };

  const handleOutsidePress = () => {
    setShowNidoOptions(false);
    setShowPagoOptions(false);
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
