import React from "react";
import { View, Text, Button, Modal } from "react-native";

const PopupScreen = ({ visible, onClose, navigation, txt, navigateTo }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>{txt}</Text>
          <Button
            title="OK"
            onPress={() => {
              onClose();
              navigateTo != null ? navigation.navigate(navigateTo) : null; // Pass null if no navigation needed.
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PopupScreen;
