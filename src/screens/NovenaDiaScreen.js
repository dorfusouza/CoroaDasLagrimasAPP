import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { NOVENA } from "../data/devocionario/novena";
import {
  getMetaAtiva,
  registrarProgressoMetaAoFinalizar,
} from "../utils/metas";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function NovenaDiaScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { dia } = route.params;
  const [meta, setMeta] = useState(null);

  const item = NOVENA.find((d) => d.dia === dia);
  const total = NOVENA.length;

  useFocusEffect(
    useCallback(() => {
      getMetaAtiva().then(setMeta);
    }, [dia])
  );

  const metaNovena = meta && meta.tipo === "novena" && !meta.concluido;
  const diaJaRezado = metaNovena && meta.progresso >= dia;
  const podeMarcar = metaNovena && meta.progresso + 1 === dia;

  async function marcarRezado() {
    const { meta: atualizada, concluida } =
      await registrarProgressoMetaAoFinalizar({ novenaDia: dia });
    setMeta(atualizada);

    if (concluida) {
      Alert.alert(
        "Parabéns! 🎉",
        `Você concluiu a novena: "${atualizada.titulo}".`,
        [
          { text: "Criar nova meta", onPress: () => navigation.navigate("MetaCriar") },
          { text: "Fechar", style: "cancel" },
        ]
      );
    }
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
        <Text style={styles.title}>Dia {item.dia}</Text>
        <Text style={styles.sub}>{item.titulo}</Text>

        <Text style={styles.text}>{item.texto}</Text>

        {podeMarcar && (
          <TouchableOpacity style={styles.markBtn} onPress={marcarRezado}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={20}
              color={COLORS.violeta}
            />
            <Text style={styles.markBtnText}>Marcar dia como rezado</Text>
          </TouchableOpacity>
        )}

        {diaJaRezado && (
          <View style={styles.doneChip}>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={COLORS.dourado}
            />
            <Text style={styles.doneChipText}>Dia concluído</Text>
          </View>
        )}

        <View style={styles.navRow}>
          {dia > 1 ? (
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.setParams({ dia: dia - 1 })}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={18}
                color={COLORS.dourado}
              />
              <Text style={styles.navBtnText}>Dia {dia - 1}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navSpacer} />
          )}

          {dia < total ? (
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.setParams({ dia: dia + 1 })}
            >
              <Text style={styles.navBtnText}>Dia {dia + 1}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={18}
                color={COLORS.dourado}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.navSpacer} />
          )}
        </View>

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
    color: COLORS.textoClaro,
    textAlign: "center",
  },

  sub: {
    fontSize: 18,
    color: COLORS.dourado,
    textAlign: "center",
    marginTop: 4,
    marginBottom: SPACING.lg,
  },

  text: {
    fontSize: 17,
    color: COLORS.textoClaro,
    lineHeight: 28,
  },

  markBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.dourado,
    paddingVertical: 14,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.lg,
  },

  markBtnText: {
    color: COLORS.violeta,
    fontSize: 16,
    fontWeight: "600",
  },

  doneChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    alignSelf: "center",
    backgroundColor: COLORS.douradoTrans,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.lg,
  },

  doneChipText: {
    color: COLORS.dourado,
    fontSize: 14,
    fontWeight: "600",
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.lg,
  },

  navBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.douradoBordaSuave,
  },

  navBtnText: {
    color: COLORS.dourado,
    fontSize: 14,
    fontWeight: "600",
  },

  navSpacer: { width: 1 },
});
