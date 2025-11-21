import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setMeta } from "../utils/metas";

export default function MetaCriarScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [tipo, setTipo] = useState("coroas"); // coroas / dias / novena
  const [objetivo, setObjetivo] = useState("10");
  const [titulo, setTitulo] = useState("");

  async function criar() {
    const objNum = parseInt(objetivo, 10);
    if (!objNum || objNum <= 0) {
      Alert.alert("Meta inválida", "Defina um objetivo numérico maior que zero.");
      return;
    }
    const meta = {
      uid: Date.now().toString(),
      tipo,
      objetivo: objNum,
      progresso: 0,
      titulo: titulo || (tipo === "coroas" ? `Rezarei ${objNum} coroas` : tipo === "dias" ? `Streak ${objNum} dias` : "Novena"),
      criadoEm: new Date().toISOString().split("T")[0],
      concluido: false,
    };
    await setMeta(meta);
    navigation.navigate("MetaAtual");
  }

  return (
    <LinearGradient colors={["#19204A", "#4B1C56", "#CFAF56"]} style={{flex:1}}>
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>Criar Meta</Text>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => setTipo("coroas")} style={[styles.choice, tipo === "coroas" && styles.choiceActive]}>
            <Text style={styles.choiceText}>Coroas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTipo("dias")} style={[styles.choice, tipo === "dias" && styles.choiceActive]}>
            <Text style={styles.choiceText}>Dias (streak)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTipo("novena")} style={[styles.choice, tipo === "novena" && styles.choiceActive]}>
            <Text style={styles.choiceText}>Novena</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={objetivo}
          onChangeText={setObjetivo}
          placeholder="Objetivo (ex: 10)"
          placeholderTextColor="#ddd"
        />

        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Título da meta (opcional)"
          placeholderTextColor="#ddd"
        />

        <TouchableOpacity style={styles.button} onPress={criar}>
          <Text style={styles.buttonText}>Criar Meta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, paddingHorizontal:20 },
  title: { color:"#fff", fontSize:24, fontWeight:"bold", textAlign:"center", marginBottom:16 },
  row: { flexDirection:"row", justifyContent:"space-between", marginBottom:12 },
  choice: { padding:10, borderRadius:8, backgroundColor:"rgba(255,255,255,0.06)", flex:1, marginHorizontal:4, alignItems:"center" },
  choiceActive: { backgroundColor:"#E2C878" },
  choiceText: { color:"#fff", fontWeight:"600" },
  input: { backgroundColor:"rgba(255,255,255,0.04)", color:"#fff", padding:12, borderRadius:8, marginTop:12 },
  button: { backgroundColor:"#4B1C56", padding:14, borderRadius:10, marginTop:20, alignItems:"center" },
  buttonText: { color:"#fff", fontWeight:"bold", fontSize:16 }
});
