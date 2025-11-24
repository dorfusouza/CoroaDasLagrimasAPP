import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./styles";

export default function DevocionarioCard({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
