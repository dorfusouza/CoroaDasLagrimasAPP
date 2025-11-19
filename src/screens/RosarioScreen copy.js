import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
} from "react-native";
import { gerarSequencia } from "../data/oracoes";
import { incDias } from "../utils/storage";
import { COLORS } from "../theme/colors";
import * as Haptics from "expo-haptics";

export default function RosarioScreen({ navigation }) {
  const seq = gerarSequencia();
  const [index, setIndex] = useState(0);
  const etapa = seq[index];
  const totalContas = seq.length;

  const rotate = useRef(new Animated.Value(0)).current;

  const avancar = () => {
    if (etapa.tipo === "jaculatoria") {
      Animated.timing(rotate, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        rotate.setValue(0);
        next();
      });
    } else next();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const next = () => {
    if (index < totalContas - 1) setIndex(index + 1);
    else finalizar();
  };

  const voltar = () => {
    if (index > 0) setIndex(index - 1);
  };

  const finalizar = async () => {
    await incDias();
    navigation.navigate("Home");
  };

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  function renderRosary() {
    let verticalCurve = 0;
    return [...Array(totalContas)].map((_, i) => {
      const isActive = i <= index;
      const isContaMaior =
        seq[i].tipo === "conta-maior" || seq[i].tipo === "conta-final";
      const isMedalha = seq[i].tipo === "jaculatoria";

      // Criando um formato curvo sutil
      if (i % 8 === 0) verticalCurve += 10;

      if (isMedalha)
        return (
          <Animated.Image
            key={i}
            source={
              seq[i].face === 1
                ? require("../../assets/medalha-frente.png")
                : require("../../assets/medalha-verso.png")
            }
            style={[
              styles.medalha,
              { transform: [{ rotate: rotation }] },
              { marginTop: verticalCurve },
            ]}
          />
        );

      return (
        <View
          key={i}
          style={[
            styles.bead,
            isContaMaior ? styles.beadMaior : styles.beadMenor,
            isActive ? styles.ativa : styles.inativa,
            { marginTop: verticalCurve },
          ]}
        />
      );
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {etapa.tipo === "oferecimento"
          ? "Oferecimento"
          : etapa.tipo === "conta-maior"
          ? `Conta maior (Mistério ${etapa.grupo})`
          : etapa.tipo === "conta-menor"
          ? `Conta menor ${etapa.grupo}-${etapa.ordem}`
          : etapa.tipo === "conta-final"
          ? `Conta final ${etapa.ordem}`
          : etapa.tipo === "oremos"
          ? "Oremos"
          : "Jaculatória"}
      </Text>

      <Text style={styles.oracao}>{etapa.texto}</Text>

      <View style={styles.rosarioView}>{renderRosary()}</View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={voltar} style={styles.smallBtn}>
          <Text style={styles.smallText}>◀</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={avancar} style={styles.bigBtn}>
          <Text style={styles.bigText}>▶</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.fundo,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.azul,
    marginBottom: 10,
    textAlign: "center",
  },
  oracao: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
  },

  rosarioView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "95%",
    marginBottom: 35,
  },

  bead: {
    borderRadius: 50,
    margin: 4,
  },

  beadMenor: {
    width: 18,
    height: 18,
  },

  beadMaior: {
    width: 26,
    height: 26,
    borderWidth: 1.5,
    borderColor: "#444",
  },

  ativa: {
    backgroundColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  inativa: {
    backgroundColor: "#D3D3D3",
  },

  medalha: {
    width: 55,
    height: 75,
    resizeMode: "contain",
    margin: 10,
  },

  controls: {
    flexDirection: "row",
    gap: 35,
    marginBottom: 50,
  },
  smallBtn: {
    backgroundColor: COLORS.azul,
    padding: 12,
    borderRadius: 50,
  },
  bigBtn: {
    backgroundColor: COLORS.violeta,
    padding: 18,
    borderRadius: 50,
  },
  smallText: { fontSize: 18, color: COLORS.branco },
  bigText: { fontSize: 24, color: COLORS.branco, fontWeight: "bold" },
});
