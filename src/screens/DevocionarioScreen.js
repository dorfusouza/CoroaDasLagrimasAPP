import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DevocionarioScreen({ navigation }) {
  const insets = useSafeAreaInsets();

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
        <Text style={styles.title}>Devocionário de Nossa Senhora das Lágrimas</Text>

        <Text style={styles.sectionTitle}>História</Text>
        <Text style={styles.text}>
          A devoção a Nossa Senhora das Lágrimas está ligada às manifestações
          espirituais recebidas pela Irmã Amália Aguirre, religiosa em Campinas
          (SP), em 1930. Nessa ocasião, a Santíssima Virgem revelou-lhe a Coroa
          das Lágrimas, uma oração profundamente ligada à Paixão de Cristo.
        </Text>

        <Text style={styles.sectionTitle}>Material de Estudo e Oração</Text>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            Linking.openURL(
              "https://livrariaraphaeltonon.com.br/devocionario-das-lagrimas"
            )
          }
        >
          <Text style={styles.linkText}>📘 Comprar Devocionário (Raphael Tonon)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            Linking.openURL(
              "https://www.youtube.com/results?search_query=raphael+tonon+lágrimas"
            )
          }
        >
          <Text style={styles.linkText}>🎥 Aulas e Reflexões</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Rosario")}
        >
          <Text style={styles.linkText}>🙏 Rezar a Coroa das Lágrimas</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#F9F7F3",
    textAlign: "center",
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E2C878",
    marginTop: 20,
    marginBottom: 10,
  },

  text: {
    color: "#F9F7F3",
    fontSize: 17,
    lineHeight: 26,
  },

  linkButton: {
    backgroundColor: "#3B4C97aa",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 15,
  },

  linkText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
  },
});
