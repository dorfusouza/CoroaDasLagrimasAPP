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
import { NOVENA } from "../data/devocionario/novena";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function NovenaScreen({ navigation }) {
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
        <Text style={styles.title}>Novena</Text>
        <Text style={styles.subtitle}>
          Nove dias de oração a Nossa Senhora das Lágrimas
        </Text>

        {NOVENA.map((dia) => (
          <TouchableOpacity
            key={dia.dia}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate("NovenaDia", { dia: dia.dia })
            }
          >
            <View style={styles.dayChip}>
              <Text style={styles.dayChipText}>{dia.dia}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Dia {dia.dia}</Text>
              <Text style={styles.cardSub} numberOfLines={2}>
                {dia.titulo}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color={COLORS.textoSecundario}
            />
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
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textoSecundario,
    marginBottom: SPACING.lg,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm + 4,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.card,
    marginBottom: SPACING.sm + 2,
  },

  dayChip: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.chip,
    backgroundColor: COLORS.douradoTrans,
    alignItems: "center",
    justifyContent: "center",
  },

  dayChipText: {
    color: COLORS.dourado,
    fontSize: 16,
    fontWeight: "700",
  },

  cardBody: { flex: 1 },

  cardTitle: {
    fontSize: 15,
    color: COLORS.textoClaro,
    fontWeight: "600",
  },

  cardSub: {
    fontSize: 13,
    color: COLORS.textoSecundario,
    marginTop: 2,
  },
});
