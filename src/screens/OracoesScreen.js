import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function OracoesScreen({ navigation }) {

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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Orações</Text>

        {lista.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("OracaoDetalhe", { id: item.id })}
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
  content: { padding: 20 },
  title: {
    fontSize: 26,
    color: "#F9F7F3",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#3B4C97aa",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
  },
});
