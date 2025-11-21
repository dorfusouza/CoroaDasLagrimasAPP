import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function JaculatoriaDetalhe({ route }) {
  const { texto } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#19204A", "#4B1C56", "#CFAF56"]}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 },
        ]}
      >
        <Text style={styles.title}>Jaculatória</Text>
        <Text style={styles.text}>{texto}</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  title: {
    fontSize: 26,
    color: "#F9F7F3",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  text: {
    fontSize: 20,
    color: "#F9F7F3",
    lineHeight: 30,
    fontStyle: "italic",
  },
});
