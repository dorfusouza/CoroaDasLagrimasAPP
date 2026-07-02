import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function DevocionarioScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const links = [
    {
      titulo: "Comprar Devocionário (Raphael Tonon)",
      icone: "book-outline",
      onPress: () =>
        Linking.openURL(
          "https://livrariaraphaeltonon.com.br/devocionario-das-lagrimas"
        ),
    },
    {
      titulo: "Aulas e Reflexões",
      icone: "play-circle-outline",
      onPress: () =>
        Linking.openURL(
          "https://www.youtube.com/results?search_query=raphael+tonon+lágrimas"
        ),
    },
    {
      titulo: "Rezar a Coroa das Lágrimas",
      icone: "hands-pray",
      onPress: () => navigation.navigate("Rosario"),
    },
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
        <Text style={styles.title}>
          Devocionário de Nossa Senhora das Lágrimas
        </Text>

        <Text style={styles.sectionTitle}>História</Text>
        <Text style={styles.text}>
          A devoção a Nossa Senhora das Lágrimas está ligada às manifestações
          espirituais recebidas pela Irmã Amália Aguirre, religiosa em Campinas
          (SP), em 1930. Nessa ocasião, a Santíssima Virgem revelou-lhe a Coroa
          das Lágrimas, uma oração profundamente ligada à Paixão de Cristo.
        </Text>

        <Text style={styles.sectionTitle}>Material de Estudo e Oração</Text>

        {links.map((item) => (
          <TouchableOpacity
            key={item.titulo}
            style={styles.linkButton}
            activeOpacity={0.75}
            onPress={item.onPress}
          >
            <View style={styles.iconChip}>
              <MaterialCommunityIcons
                name={item.icone}
                size={18}
                color={COLORS.dourado}
              />
            </View>
            <Text style={styles.linkText}>{item.titulo}</Text>
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
    paddingHorizontal: SPACING.md + 4,
    paddingBottom: SPACING.lg,
  },

  title: {
    fontFamily: FONTS.title,
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.textoClaro,
    marginBottom: SPACING.lg,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dourado,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },

  text: {
    color: COLORS.textoClaro,
    fontSize: 16,
    lineHeight: 26,
  },

  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm + 4,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm + 4,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.card,
    marginTop: SPACING.sm + 4,
  },

  iconChip: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.chip,
    backgroundColor: COLORS.douradoTrans,
    alignItems: "center",
    justifyContent: "center",
  },

  linkText: {
    flex: 1,
    color: COLORS.textoClaro,
    fontSize: 15,
    fontWeight: "600",
  },
});
