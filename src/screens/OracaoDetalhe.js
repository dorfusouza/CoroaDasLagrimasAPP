import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ORACOES } from "../data/devocionario/oracoes";

export default function OracaoDetalhe({ route }) {
  const { id } = route.params;
  const texto = ORACOES[id];
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
        <Text style={styles.title}>{id.toUpperCase()}</Text>

        {Array.isArray(texto) ? (
          texto.map((linha, i) => (
            <Text key={i} style={styles.text}>{linha}</Text>
          ))
        ) : (
          <Text style={styles.text}>{texto}</Text>
        )}
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
    fontSize: 24,
    color: "#F9F7F3",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  text: {
    color: "#F9F7F3",
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 10,
  },
});
