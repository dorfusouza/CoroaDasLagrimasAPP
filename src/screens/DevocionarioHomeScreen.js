import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DevocionarioHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const cards = [
    { titulo: "História", rota: "Historia", emoji: "📜" },
    { titulo: "Orações", rota: "Oracoes", emoji: "🙏" },
    { titulo: "Jaculatórias", rota: "Jaculatorias", emoji: "💌" },
    { titulo: "Jaculatória do Dia", rota: "JaculatoriaDoDia", emoji: "✨" },
    { titulo: "Novena", rota: "Novena", emoji: "🌹" },
    { titulo: "Leituras", rota: "Leituras", emoji: "📖" },

  ];

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
        <Text style={styles.title}>Devocionário</Text>

        <View style={styles.grid}>
          {cards.map((item) => (
            <TouchableOpacity
              key={item.rota}
              style={styles.card}
              onPress={() => navigation.navigate(item.rota)}
            >
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 50 }} />
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
    fontSize: 32,
    color: "#F9F7F3",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#3B4C97cc",
    borderRadius: 12,
    paddingVertical: 25,
    marginBottom: 20,
    alignItems: "center",
  },

  cardEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 18,
    color: "#F9F7F3",
    textAlign: "center",
    fontWeight: "600",
  },
});
