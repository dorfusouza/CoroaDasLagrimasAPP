import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { JACULATORIAS } from "../data/devocionario/jaculatorias";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function JaculatoriasScreen({ navigation }) {
  const insets = useSafeAreaInsets();

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
        <Text style={styles.title}>Jaculatórias</Text>

        <TouchableOpacity
          style={styles.bigButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("JaculatoriaDoDia")}
        >
          <MaterialCommunityIcons
            name="star-four-points-outline"
            size={18}
            color={COLORS.violeta}
          />
          <Text style={styles.bigButtonText}>Jaculatória do Dia</Text>
        </TouchableOpacity>

        {JACULATORIAS.map((texto, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate("JaculatoriaDetalhe", { texto })
            }
          >
            <Text style={styles.cardText}>{texto}</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
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
    marginBottom: SPACING.lg,
  },

  bigButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.dourado,
    paddingVertical: 14,
    borderRadius: RADIUS.pill,
    marginBottom: SPACING.lg,
  },

  bigButtonText: {
    color: COLORS.violeta,
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.card,
    marginBottom: SPACING.sm + 2,
  },

  cardText: {
    color: COLORS.textoClaro,
    fontSize: 16,
    lineHeight: 25,
    fontStyle: "italic",
  },
});
