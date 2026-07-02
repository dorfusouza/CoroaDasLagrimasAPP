import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function JaculatoriaDetalhe({ route }) {
  const { texto } = route.params;
  const insets = useSafeAreaInsets();

  async function compartilhar() {
    await Share.share({
      message: `"${texto}" — jaculatória no app Nossa Senhora das Lágrimas 💧`,
    });
  }

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
        <Text style={styles.title}>Jaculatória</Text>
        <Text style={styles.text}>{texto}</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.shareBtn} onPress={compartilhar}>
            <MaterialCommunityIcons
              name="share-variant-outline"
              size={18}
              color={COLORS.violeta}
            />
            <Text style={styles.shareBtnText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>
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
    color: COLORS.textoClaro,
    textAlign: "center",
    marginBottom: SPACING.md,
  },

  text: {
    fontSize: 20,
    color: COLORS.textoClaro,
    lineHeight: 30,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: SPACING.xl,
  },

  actions: {
    alignItems: "center",
    marginTop: SPACING.xl,
  },

  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.dourado,
    paddingVertical: 12,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.pill,
  },

  shareBtnText: {
    color: COLORS.violeta,
    fontSize: 15,
    fontWeight: "600",
  },
});
