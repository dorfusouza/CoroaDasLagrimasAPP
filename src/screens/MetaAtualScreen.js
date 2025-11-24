import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getMetaAtiva, atualizarMeta } from "../utils/metas";

export default function MetaAtualScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getMetaAtiva().then(setMeta);
  }, []);

  if (!meta) {
    return (
      <LinearGradient
        colors={["#19204A", "#4B1C56", "#CFAF56"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>
          Nenhuma meta ativa no momento.
        </Text>
      </LinearGradient>
    );
  }

  const pct = meta.objetivo > 0
    ? Math.min(1, meta.progresso / meta.objetivo)
    : 0;

  const percentText = Math.round(pct * 100);

  async function compartilhar() {
    await Share.share({
      message:
        `Concluí minha meta: "${meta.titulo}". ` +
        `Venha rezar comigo no app Nossa Senhora das Lágrimas 💧`
    });
  }

  async function resetar() {
    const novo = { ...meta, progresso: 0, concluido: false };
    await atualizarMeta(novo);
    setMeta(novo);
  }

  return (
    <LinearGradient
      colors={["#19204A", "#4B1C56", "#CFAF56"]}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>

        <Text style={styles.title}>{meta.titulo}</Text>

        {/* ==== CÍRCULO NATIVO ==== */}
        <View style={styles.circle}>
          <View style={[styles.circleFill, { width: `${percentText}%` }]} />
          <Text style={styles.circleText}>{percentText}%</Text>
        </View>

        <Text style={styles.progressText}>
          {meta.progresso} / {meta.objetivo}
        </Text>

        {/* PRAY BUTTON */}
        <TouchableOpacity
          style={styles.btnPray}
          onPress={() => navigation.navigate("Rosario")}
        >
          <Text style={styles.btnPrayText}>🙏 Rezar Agora</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPrimary} onPress={compartilhar}>
          <Text style={styles.btnText}>Compartilhar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={resetar}>
          <Text style={styles.btnText}>Resetar Meta</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },

  title: {
    color: "#E2C878",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  /* Barra circular nativa */
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    borderColor: "#ffffff33",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    overflow: "hidden",
  },

  circleFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#E2C878",
  },

  circleText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  progressText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 16
  },

  btnPray: {
    backgroundColor: "#E2C878",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },

  btnPrayText: {
    color: "#4B1C56",
    fontSize: 18,
    fontWeight: "bold",
  },

  btnPrimary: {
    backgroundColor: "#4B1C56",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },

  btnSecondary: {
    backgroundColor: "#7A2569",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
