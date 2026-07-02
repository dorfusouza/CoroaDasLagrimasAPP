import React from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LEITURAS } from "../data/devocionario/leituras";
import { COLORS, SPACING, FONTS } from "../theme";

export default function LeituraDetalhe({ route }) {
  const insets = useSafeAreaInsets();
  const { id } = route.params;

  const item = LEITURAS.find((x) => x.id === id);

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
        <Text style={styles.title}>{item.titulo}</Text>

        <Text style={styles.text}>{item.texto}</Text>

        <View style={{ height: 50 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  content: {
    paddingHorizontal: SPACING.md + 4,
    paddingBottom: SPACING.lg,
  },

  title: {
    fontFamily: FONTS.title,
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.dourado,
    marginBottom: SPACING.md,
  },

  text: {
    fontSize: 17,
    color: COLORS.textoClaro,
    lineHeight: 28,
    marginTop: SPACING.sm,
  },
});
