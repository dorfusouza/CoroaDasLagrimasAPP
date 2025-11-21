import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getMetaAtiva, atualizarMeta, clearMeta } from "../utils/metas";
import * as Progress from "react-native-progress"; 

export default function MetaAtualScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const m = await getMetaAtiva();
      if (mounted) setMeta(m);
    }
    load();

    return () => (mounted = false);
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

  const pct = Math.min(1, (meta.progresso || 0) / meta.objetivo);
  const percText = Math.round(pct * 100);

  async function compartilhar() {
    try {
      await Share.share({
        message: `Minha meta: ${meta.titulo} — Progresso: ${meta.progresso}/${meta.objetivo}. Venha rezar comigo no app Nossa Senhora das Lágrimas 💧`,
      });
    } catch (e) {}
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

        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Progress.Circle
            size={140}
            progress={pct}
            showsText={true}
            thickness={8}
            color="#E2C878"
            unfilledColor="#ffffff33"
            textStyle={{ color: "#fff", fontWeight: "bold" }}
            formatText={() => `${percText}%`}
          />
        </View>

        <Text style={styles.progressText}>
          {meta.progresso} / {meta.objetivo}
        </Text>

        {/* ------------------------------- */}
        {/*    BOTÃO REZAR AGORA ADICIONADO  */}
        {/* ------------------------------- */}
        <TouchableOpacity
          style={styles.btnPray}
          onPress={() => navigation.navigate("Rosario")}
        >
          <Text style={styles.btnPrayText}>🙏 Rezar Agora</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.btnPrimary} onPress={compartilhar}>
            <Text style={styles.btnText}>Compartilhar progresso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnSecondary, { marginTop: 12 }]}
            onPress={resetar}
          >
            <Text style={styles.btnText}>Resetar Meta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  title: {
    color: "#E2C878",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  progressText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 12,
  },

  // NOVO BOTÃO "REZAR AGORA"
  btnPray: {
    backgroundColor: "#E2C878",
    paddingVertical: 14,
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
  },

  btnSecondary: {
    backgroundColor: "#7A2569",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
