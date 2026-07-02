import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import {
  getMetaAtiva,
  atualizarMeta,
  getMetasArquivadas,
} from "../utils/metas";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";
import AppButton from "../components/AppButton";

const TIPO_LABEL = {
  coroas: "coroas",
  dias: "dias",
  novena: "dias de novena",
};

function formatarData(iso) {
  if (!iso) return "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function MetaAtualScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [meta, setMeta] = useState(null);
  const [arquivadas, setArquivadas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getMetaAtiva().then(setMeta);
      getMetasArquivadas().then(setArquivadas);
    }, [])
  );

  async function compartilhar() {
    await Share.share({
      message:
        `Concluí minha meta: "${meta.titulo}". ` +
        `Venha rezar comigo no app Nossa Senhora das Lágrimas 💧`
    });
  }

  function confirmarReset() {
    Alert.alert(
      "Resetar meta",
      "O progresso desta meta voltará a zero. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Resetar", style: "destructive", onPress: resetar },
      ]
    );
  }

  async function resetar() {
    const novo = { ...meta, progresso: 0, concluido: false };
    await atualizarMeta(novo);
    setMeta(novo);
  }

  const pct = meta && meta.objetivo > 0
    ? Math.min(1, meta.progresso / meta.objetivo)
    : 0;
  const percentText = Math.round(pct * 100);

  return (
    <LinearGradient
      colors={[COLORS.fundoProfundo, COLORS.fundoEscuro, COLORS.violeta]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 24 },
        ]}
      >
        {meta ? (
          <>
            <Text style={styles.title}>{meta.titulo}</Text>

            <View style={styles.circle}>
              <View style={[styles.circleFill, { width: `${percentText}%` }]} />
              <Text style={styles.circleText}>{percentText}%</Text>
            </View>

            <Text style={styles.progressText}>
              {meta.progresso} de {meta.objetivo}
            </Text>

            <View style={styles.actions}>
              <AppButton
                label="Rezar agora"
                mode="primary"
                onPress={() => navigation.navigate("Rosario")}
              />

              <AppButton
                label="Compartilhar"
                mode="secondary"
                onPress={compartilhar}
              />

              <TouchableOpacity style={styles.resetBtn} onPress={confirmarReset}>
                <Text style={styles.resetText}>Resetar meta</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyBlock}>
            <View style={styles.emptyIconChip}>
              <MaterialCommunityIcons
                name="target"
                size={34}
                color={COLORS.dourado}
              />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma meta ativa</Text>
            <Text style={styles.emptyText}>
              Crie uma meta para acompanhar sua caminhada de oração.
            </Text>
            <AppButton
              label="Criar meta"
              mode="primary"
              onPress={() => navigation.navigate("MetaCriar")}
            />
          </View>
        )}

        {arquivadas.length > 0 && (
          <View style={styles.histSection}>
            <Text style={styles.histLabel}>Metas concluídas</Text>

            {arquivadas
              .slice()
              .reverse()
              .map((m, i) => (
                <View key={m.uid || i} style={styles.histCard}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color={COLORS.dourado}
                  />
                  <View style={styles.histBody}>
                    <Text style={styles.histTitle}>{m.titulo}</Text>
                    <Text style={styles.histSub}>
                      {m.objetivo} {TIPO_LABEL[m.tipo] || ""}
                      {m.concluidoEm
                        ? ` · concluída em ${formatarData(m.concluidoEm)}`
                        : ""}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
  },

  emptyBlock: {
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },

  emptyIconChip: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.douradoTrans,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },

  emptyTitle: {
    fontFamily: FONTS.title,
    fontSize: 24,
    color: COLORS.textoClaro,
    marginBottom: SPACING.xs,
  },

  emptyText: {
    fontSize: 15,
    color: COLORS.textoSecundario,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },

  title: {
    fontFamily: FONTS.title,
    color: COLORS.dourado,
    fontSize: 26,
    textAlign: "center",
  },

  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    borderColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: SPACING.xl,
    overflow: "hidden",
  },

  circleFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.dourado,
  },

  circleText: {
    color: COLORS.textoClaro,
    fontSize: 28,
    fontWeight: "bold",
  },

  progressText: {
    color: COLORS.textoSecundario,
    fontSize: 16,
    textAlign: "center",
    marginTop: SPACING.md,
  },

  actions: {
    alignItems: "center",
    marginTop: SPACING.lg,
  },

  resetBtn: {
    paddingVertical: SPACING.sm,
    marginTop: SPACING.xs,
  },

  resetText: {
    color: COLORS.textoSecundario,
    fontSize: 14,
    textDecorationLine: "underline",
  },

  histSection: {
    marginTop: SPACING.xl,
  },

  histLabel: {
    fontSize: 12,
    color: COLORS.textoSecundario,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: SPACING.sm,
  },

  histCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm + 4,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.card,
    marginBottom: SPACING.sm,
  },

  histBody: { flex: 1 },

  histTitle: {
    fontSize: 14,
    color: COLORS.textoClaro,
    fontWeight: "600",
  },

  histSub: {
    fontSize: 12,
    color: COLORS.textoSecundario,
    marginTop: 2,
  },
});
