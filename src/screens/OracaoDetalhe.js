import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ORACOES } from "../data/devocionario/oracoes";

export default function OracaoDetalhe({ route }) {
  if (!route || !route.params) {
    return (
      <LinearGradient
        colors={["#19204A", "#4B1C56", "#CFAF56"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>
          Oração não encontrada.
        </Text>
      </LinearGradient>
    );
  }

  const { id } = route.params;
  const texto = ORACOES[id];

  return (
    <LinearGradient
      colors={["#19204A", "#4B1C56", "#CFAF56"]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.content}>
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
  content: { padding: 20 },
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    lineHeight: 28,
    marginBottom: 12,
  },
});
