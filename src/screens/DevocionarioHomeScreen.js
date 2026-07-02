import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AdBanner from "../components/AdBanner";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function DevocionarioHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const cards = [
    { titulo: "História", rota: "Historia", icone: "script-text-outline" },
    { titulo: "Orações", rota: "Oracoes", icone: "hands-pray" },
    { titulo: "Jaculatórias", rota: "Jaculatorias", icone: "cards-heart-outline" },
    { titulo: "Jaculatória do Dia", rota: "JaculatoriaDoDia", icone: "star-four-points-outline" },
    { titulo: "Novena", rota: "Novena", icone: "flower-outline" },
    { titulo: "Leituras", rota: "Leituras", icone: "book-open-variant" },
    { titulo: "Minhas Metas", rota: "MetaAtual", icone: "target" },
    { titulo: "Materiais e Estudo", rota: "Devocionario", icone: "bookshelf" },
  ];

  return (
    <LinearGradient
      colors={[COLORS.fundoProfundo, COLORS.fundoEscuro, COLORS.violeta]}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 24 },
        ]}
      >
        <Text style={styles.title}>Devocionário</Text>
        <Text style={styles.subtitle}>Orações, novena e leituras</Text>

        <View style={styles.grid}>
          {cards.map((item) => (
            <TouchableOpacity
              key={item.rota}
              style={styles.card}
              activeOpacity={0.75}
              onPress={() => navigation.navigate(item.rota)}
            >
              <View style={styles.iconChip}>
                <MaterialCommunityIcons
                  name={item.icone}
                  size={20}
                  color={COLORS.dourado}
                />
              </View>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <AdBanner />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  content: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },

  title: {
    fontFamily: FONTS.title,
    fontSize: 30,
    color: COLORS.textoClaro,
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textoSecundario,
    marginBottom: SPACING.lg,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48.5%",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    marginBottom: SPACING.sm + 2,
  },

  iconChip: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.chip,
    backgroundColor: COLORS.douradoTrans,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm + 2,
  },

  cardTitle: {
    fontSize: 14,
    color: COLORS.textoClaro,
    fontWeight: "600",
  },
});
