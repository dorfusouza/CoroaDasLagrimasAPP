import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getJaculatoriaDoDia } from "../utils/jaculatoriaDoDia";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function JaculatoriaDoDia({ navigation }) {
  const insets = useSafeAreaInsets();
  const [texto, setTexto] = useState(null);

  useEffect(() => {
    async function carregar() {
      const frase = await getJaculatoriaDoDia();
      setTexto(frase);
    }
    carregar();
  }, []);

  async function compartilhar() {
    await Share.share({
      message: `"${texto}" — Jaculatória do dia no app Nossa Senhora das Lágrimas 💧`,
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
        <Text style={styles.title}>Jaculatória do Dia</Text>

        {!texto ? (
          <ActivityIndicator color={COLORS.dourado} size="large" />
        ) : (
          <>
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

              <TouchableOpacity
                style={styles.allBtn}
                onPress={() => navigation.navigate("Jaculatorias")}
              >
                <Text style={styles.allBtnText}>Ver todas as jaculatórias</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={18}
                  color={COLORS.dourado}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
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
    gap: SPACING.md,
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

  allBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: SPACING.sm,
  },

  allBtnText: {
    color: COLORS.dourado,
    fontSize: 14,
    fontWeight: "600",
  },
});
