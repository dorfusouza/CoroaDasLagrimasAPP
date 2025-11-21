import React from "react";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LEITURAS } from "../data/devocionario/leituras";

export default function LeiturasScreen({ navigation }) {
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
        <Text style={styles.title}>Leituras Espirituais</Text>

        {LEITURAS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("LeituraDetalhe", { id: item.id })}
          >
            <Text style={styles.cardTitle}>{item.titulo}</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#F9F7F3",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#3B4C97cc",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 18,
    color: "#F9F7F3",
    fontWeight: "600",
  },
});
