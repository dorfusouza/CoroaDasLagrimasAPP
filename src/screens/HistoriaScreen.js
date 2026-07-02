import React from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HISTORIA } from "../data/devocionario/historia";
import { COLORS, SPACING, FONTS } from "../theme";

export default function HistoriaScreen() {
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
        <Text style={styles.title}>{HISTORIA.titulo}</Text>

        <Text style={styles.text}>{HISTORIA.introducao}</Text>

        <Text style={styles.sectionTitle}>{HISTORIA.secao1_titulo}</Text>
        <Text style={styles.text}>{HISTORIA.secao1_texto}</Text>

        <Text style={styles.sectionTitle}>{HISTORIA.secao2_titulo}</Text>
        <Text style={styles.text}>{HISTORIA.secao2_texto}</Text>

        <Text style={styles.sectionTitle}>{HISTORIA.secao3_titulo}</Text>
        <Text style={styles.text}>{HISTORIA.secao3_texto}</Text>

        <Text style={styles.sectionTitle}>{HISTORIA.secao4_titulo}</Text>
        <Text style={styles.text}>{HISTORIA.secao4_texto}</Text>

        <Text style={styles.sectionTitle}>Fontes</Text>
        {HISTORIA.fontes.map((item, i) => (
          <Text key={i} style={styles.fonte}>• {item}</Text>
        ))}

        <View style={{ height: 40 }} />
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
    fontSize: 28,
    lineHeight: 36,
    color: COLORS.textoClaro,
    marginBottom: SPACING.lg,
  },

  sectionTitle: {
    fontFamily: FONTS.title,
    fontSize: 21,
    color: COLORS.dourado,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },

  text: {
    color: COLORS.textoClaro,
    fontSize: 16,
    lineHeight: 26,
  },

  fonte: {
    color: COLORS.textoSecundario,
    fontSize: 14,
    lineHeight: 22,
  },
});
