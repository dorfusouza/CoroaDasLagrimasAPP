import React from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ORACOES } from "../data/devocionario/oracoes";
import { COLORS, SPACING, FONTS } from "../theme";

export default function OracaoDetalhe({ route }) {
  const { id, titulo } = route.params;
  const texto = ORACOES[id];
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
        <Text style={styles.title}>{titulo || id}</Text>

        {Array.isArray(texto) ? (
          texto.map((linha, i) => (
            <Text key={i} style={styles.text}>{linha}</Text>
          ))
        ) : (
          <Text style={styles.text}>{texto}</Text>
        )}

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
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.dourado,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },

  text: {
    color: COLORS.textoClaro,
    fontSize: 17,
    lineHeight: 28,
    marginBottom: SPACING.sm + 2,
  },
});
