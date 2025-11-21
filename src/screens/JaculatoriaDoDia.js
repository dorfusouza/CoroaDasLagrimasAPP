import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getJaculatoriaDoDia } from "../utils/jaculatoriaDoDia";

export default function JaculatoriaDoDia() {
  const insets = useSafeAreaInsets();
  const [texto, setTexto] = useState(null);

  useEffect(() => {
    async function carregar() {
      const frase = await getJaculatoriaDoDia();
      setTexto(frase);
    }
    carregar();
  }, []);

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
        <Text style={styles.title}>Jaculatória do Dia</Text>

        {!texto ? (
          <ActivityIndicator color="#fff" size="large" />
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#F9F7F3",
    textAlign: "center",
    marginBottom: 20,
  },

  text: {
    fontSize: 20,
    color: "#F9F7F3",
    lineHeight: 30,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 30,
  },
});
