import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NOVENA } from "../data/devocionario/novena";

export default function NovenaDiaScreen({ route }) {
  const insets = useSafeAreaInsets();
  const { dia } = route.params;

  const item = NOVENA.find((d) => d.dia === dia);

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
        <Text style={styles.title}>Dia {item.dia}</Text>
        <Text style={styles.sub}>{item.titulo}</Text>

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
    fontSize: 28,
    fontWeight: "bold",
    color: "#F9F7F3",
    textAlign: "center",
  },

  sub: {
    fontSize: 20,
    color: "#E2C878",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    color: "#F9F7F3",
    lineHeight: 28,
  },
});
