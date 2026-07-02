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
import { LEITURAS } from "../data/devocionario/leituras";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function LeiturasScreen({ navigation }) {
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
        <Text style={styles.title}>Leituras Espirituais</Text>

        {LEITURAS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate("LeituraDetalhe", { id: item.id })
            }
          >
            <View style={styles.iconChip}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={18}
                color={COLORS.dourado}
              />
            </View>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
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

  iconChip: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.chip,
    backgroundColor: COLORS.douradoTrans,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textoClaro,
    fontWeight: "600",
  },
});
