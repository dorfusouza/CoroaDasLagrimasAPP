import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
      colors={["#19204A", "#4B1C56", "#CFAF56"]}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 },
        ]}
      >
        <Text style={styles.title}>Orações</Text>

        {lista.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("OracaoDetalhe", { id: item.id })
            }
          >
            <Text style={styles.cardText}>{item.titulo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  content: { paddingHorizontal: 20, paddingBottom: 20 },

  title: {
    fontSize: 26,
    color: "#F9F7F3",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#3B4C97cc",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },

  cardText: {
    color: "#fff",
    fontSize: 18,
  },
});
