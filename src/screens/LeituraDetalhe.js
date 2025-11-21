import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LEITURAS } from "../data/devocionario/leituras";

export default function LeituraDetalhe({ route }) {
  const insets = useSafeAreaInsets();
  const { id } = route.params;

  const item = LEITURAS.find((x) => x.id === id);

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
        <Text style={styles.title}>{item.titulo}</Text>

        <Text style={styles.text}>{item.texto}</Text>

        <Text style={{ height: 50 }} />
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
    fontWeight: "bold",
    color: "#E2C878",
    textAlign: "center",
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    color: "#F9F7F3",
    lineHeight: 28,
    marginTop: 10,
  },
});
