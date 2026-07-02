import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setMeta } from "../utils/metas";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";
import AppButton from "../components/AppButton";

const TIPOS = [
  { id: "coroas", label: "Coroas" },
  { id: "dias", label: "Dias (streak)" },
  { id: "novena", label: "Novena" },
];

export default function MetaCriarScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [tipo, setTipo] = useState("coroas");
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
    navigation.replace("MetaAtual");
  }

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
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Criar meta</Text>
        <Text style={styles.subtitle}>
          Escolha um objetivo para sua caminhada de oração
        </Text>

        <Text style={styles.label}>Tipo de meta</Text>
        <View style={styles.row}>
          {TIPOS.map((t) => (
            <TouchableOpacity
              key={t.id}
              onPress={() => setTipo(t.id)}
              style={[styles.choice, tipo === t.id && styles.choiceActive]}
            >
              <Text
                style={[
                  styles.choiceText,
                  tipo === t.id && styles.choiceTextActive,
                ]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Objetivo</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={objetivo}
          onChangeText={setObjetivo}
          placeholder="Ex: 10"
          placeholderTextColor={COLORS.textoSecundario}
        />

        <Text style={styles.label}>Título (opcional)</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Novena pela família"
          placeholderTextColor={COLORS.textoSecundario}
        />

        <View style={styles.buttonWrapper}>
          <AppButton label="Criar meta" mode="primary" onPress={criar} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md + 4,
    paddingBottom: SPACING.lg,
  },

  title: {
    fontFamily: FONTS.title,
    fontSize: 30,
    color: COLORS.textoClaro,
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textoSecundario,
    marginBottom: SPACING.lg,
  },

  label: {
    fontSize: 12,
    color: COLORS.textoSecundario,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },

  row: {
    flexDirection: "row",
    gap: SPACING.sm,
  },

  choice: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    alignItems: "center",
  },

  choiceActive: {
    backgroundColor: COLORS.dourado,
  },

  choiceText: {
    color: COLORS.textoClaro,
    fontSize: 13,
    fontWeight: "600",
  },

  choiceTextActive: {
    color: COLORS.violeta,
  },

  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.textoClaro,
    fontSize: 16,
    paddingVertical: SPACING.sm + 4,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.card,
  },

  buttonWrapper: {
    alignItems: "center",
    marginTop: SPACING.lg,
  },
});
