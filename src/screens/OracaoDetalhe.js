import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ORACOES } from "../data/devocionario/oracoes";

export default function OracaoDetalhe({ route }) {
  const { id } = route.params;
  const conteudo = ORACOES[id];

  return (
    <LinearGradient
      colors={["#19204A", "#4B1C56", "#CFAF56"]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{id.toUpperCase()}</Text>

        {Array.isArray(conteudo) ? (
          conteudo.map((linha, i) => (
            <Text key={i} style={styles.text}>{linha}</Text>
          ))
        ) : (
          <Text style={styles.text}>{conteudo}</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#F9F7F3",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    color: "#F9F7F3",
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 10,
  },
});
