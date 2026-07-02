import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default function OracoesScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const lista = [
    { id: "oferecimento", titulo: "Oferecimento" },
    { id: "oremos", titulo: "Oremos" },
    { id: "consagracao", titulo: "Consagração" },
    { id: "ladainha", titulo: "Ladainha de Nossa Senhora das Lágrimas" },
  ];

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
        <Text style={styles.title}>Orações</Text>

        {lista.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate("OracaoDetalhe", {
                id: item.id,
                titulo: item.titulo,
              })
            }
          >
            <View style={styles.iconChip}>
              <MaterialCommunityIcons
                name="hands-pray"
                size={18}
                color={COLORS.dourado}
              />
            </View>
            <Text style={styles.cardText}>{item.titulo}</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color={COLORS.textoSecundario}
            />
          </TouchableOpacity>
        ))}
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
    paddingVertical: SPACING.sm + 6,
    paddingHorizontal: SPACING.md,
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

  cardText: {
    flex: 1,
    color: COLORS.textoClaro,
    fontSize: 15,
    fontWeight: "600",
  },
});
