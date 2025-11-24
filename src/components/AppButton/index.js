import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";
import styles from "./styles";

export default function AppButton({ label, onPress, mode = "primary" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        mode === "primary" ? styles.primary : styles.secondary,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
