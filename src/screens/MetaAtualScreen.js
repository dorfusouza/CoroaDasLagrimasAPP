import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getMetaAtiva, atualizarMeta, clearMeta } from "../utils/metas";
import * as Progress from "react-native-progress"; // instalar: react-native-progress
// opcional confetti: react-native-confetti-cannon

export default function MetaAtualScreen() {
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
      <LinearGradient colors={["#19204A","#4B1C56","#CFAF56"]} style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{color:"#fff"}}>Nenhuma meta ativa.</Text>
      </LinearGradient>
    );
  }

  const pct = Math.min(1, (meta.progresso || 0) / meta.objetivo);
  const percText = Math.round(pct * 100);

  async function compartilhar() {
    try {
      await Share.share({ message: `Meta: ${meta.titulo} — ${meta.progresso}/${meta.objetivo}` });
    } catch (e) {}
  }

  async function resetar() {
    const novo = { ...meta, progresso: 0, concluido: false };
    await atualizarMeta(novo);
    setMeta(novo);
  }

  return (
    <LinearGradient colors={["#19204A","#4B1C56","#CFAF56"]} style={{flex:1}}>
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>{meta.titulo}</Text>

        <View style={{ alignItems:"center", marginTop:24 }}>
          <Progress.Circle size={140} progress={pct} showsText={true} formatText={() => `${percText}%`} />
        </View>

        <Text style={styles.progressText}>{meta.progresso} / {meta.objetivo}</Text>

        <View style={{ marginTop:20 }}>
          <TouchableOpacity style={styles.btnPrimary} onPress={compartilhar}><Text style={styles.btnText}>Compartilhar</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btnSecondary, {marginTop:12}]} onPress={resetar}><Text style={styles.btnText}>Resetar Meta</Text></TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, paddingHorizontal:20 },
  title:{ color:"#E2C878", fontSize:22, fontWeight:"bold", textAlign:"center" },
  progressText:{ color:"#fff", fontSize:18, textAlign:"center", marginTop:12 },
  btnPrimary:{ backgroundColor:"#E2C878", padding:12, borderRadius:10, alignItems:"center" },
  btnSecondary:{ backgroundColor:"#4B1C56", padding:12, borderRadius:10, alignItems:"center" },
  btnText:{ color:"#fff", fontWeight:"bold" }
});
