import React from "react";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { JACULATORIAS } from "../data/devocionario/jaculatorias";

export default function JaculatoriasScreen({ navigation }) {
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
        <Text style={styles.title}>Jaculatórias</Text>

        <TouchableOpacity
          style={styles.bigButton}
          onPress={() => navigation.navigate("JaculatoriaDoDia")}
        >
          <Text style={styles.bigButtonText}>✨ Jaculatória do Dia</Text>
        </TouchableOpacity>

        {JACULATORIAS.map((texto, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              navigation.navigate("JaculatoriaDetalhe", { texto })
            }
          >
            <Text style={styles.cardText}>{texto}</Text>
          </TouchableOpacity>
        ))}

        <Text style={{ height: 40 }} />
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

  bigButton: {
    backgroundColor: "#E2C878",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  bigButtonText: {
    color: "#4B1C56",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#3B4C97cc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  cardText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 26,
  },
});
