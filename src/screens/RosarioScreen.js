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
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import AdBanner from "../components/AdBanner";

export default function RosarioScreen({ navigation }) {
  const seq = gerarSequencia();
  const [index, setIndex] = useState(0);

  const etapa = seq[index];

  const circleEndIndex = 56;

  // Fade animation para troca da medalha
  const fade = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;


  const totalCircleBeads = 56;
  const angleStep = (2 * Math.PI) / totalCircleBeads;

  function avancar() {
    // Troca de medalha somente na jaculatória 2
    if (etapa.tipo === "jaculatoria" && etapa.face === 2) {
      Animated.sequence([
        Animated.timing(fade, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start(() => next());
    } else {
      next();
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  function next() {
    if (index < seq.length - 1) setIndex(index + 1);
    else finalizar();
  }

  function voltar() {
    if (index > 0) setIndex(index - 1);
  }

  async function finalizar() {
    await incDias();
    navigation.navigate("Home");
  }

  function pressIn() {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }


  const renderCircle = () => {
    const items = [];
    for (let i = 0; i < totalCircleBeads; i++) {
      const offset = Math.PI / 2;
      const x = Math.cos(-i * angleStep + offset) * 120;
      const y = Math.sin(-i * angleStep + offset) * 120;

      const isActive = index > i || index > circleEndIndex;
      const isMajor = i % 8 === 0;

      items.push(
        <View
          key={i}
          style={[
            styles.bead,
            isMajor ? styles.bigBead : styles.smallBead,
            isActive ? styles.active : styles.inactive,
            {
              position: "absolute",
              top: 130 + y,
              left: 130 + x,
            },
          ]}
        />
      );
    }

    return <View style={styles.circleContainer}>{items}</View>;
  };

  return (
    <LinearGradient
      colors={["#19204A", "#4B1C56", "#CFAF56"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{etapa.tipo.toUpperCase()}</Text>
        <Text style={styles.oracao}>{etapa.texto}</Text>

        {renderCircle()}

        {/* 3 contas finais */}
        <View style={styles.finalBeads}>
          {[0, 1, 2].map((i) => {
            const active = index > totalCircleBeads + i;
            return (
              <View
                key={i}
                style={[
                  styles.bead,
                  styles.bigBead,
                  active ? styles.active : styles.inactive,
                  { marginVertical: 2 },
                ]}
              />
            );
          })}
        </View>

        {/* Medalha */}
        <Animated.Image
          source={
            etapa.tipo === "jaculatoria" && etapa.face === 1
              ? require("../../assets/medalha-verso.png")
              : require("../../assets/medalha-frente.png")
          }
          style={[styles.medalha, { opacity: fade }]}
        />
      </ScrollView>

      {/* Botões fixos */}
      <View style={styles.fixedControls}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity
            onPressIn={pressIn}
            onPressOut={pressOut}
            onPress={voltar}
            style={[styles.baseButton, styles.smallBtn]}
          >
            <Text style={styles.smallText}>◀</Text>
          </TouchableOpacity>
        </Animated.View>


        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity
            onPressIn={pressIn}
            onPressOut={pressOut}
            onPress={avancar}
            style={[styles.baseButton, styles.bigBtn]}
          >
            <Text style={styles.bigText}>▶</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>

      {/* Banner Ad */}
      <AdBanner />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  scrollContent: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 150, // para não encostar nos botões
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F9F7F3",
    textAlign: "center",
    marginBottom: 10,
  },

  oracao: {
    fontSize: 18,
    color: "#F9F7F3",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    lineHeight: 28,
  },

  medalha: {
    width: 85,
    height: 110,
    resizeMode: "contain",
    marginTop: 4,
    marginBottom: 18,
  },

  circleContainer: {
    width: 260,
    height: 260,
    position: "relative",
    marginVertical: 12,
    marginBottom: 18,
  },

  bead: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  bigBead: {
    width: 22,
    aspectRatio: 1,
  },

  smallBead: {
    width: 16,
    height: 16,
    borderRadius: 999,
  },

  active: {
    backgroundColor: "#E2C878",
    borderWidth: 1,
    borderColor: "#C9A200",
    shadowColor: "#E2C878",
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },

  inactive: {
    backgroundColor: "#D7D7D7",
    opacity: 0.8,
  },

  finalBeads: {
    alignItems: "center",
  },

  fixedControls: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },

  baseButton: {
    minWidth: 80,
    height: 56,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,

    // Área de toque recomendada pela Apple
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    elevation: 4, // Android shadow
  },

  smallBtn: {
    backgroundColor: "#3B4C97cc", // azul mariano com transparência
    borderWidth: 1,
    borderColor: "#93A4E8",
  },

  bigBtn: {
    backgroundColor: "#E2C878", // dourado elegante
    borderWidth: 2,
    borderColor: "#7A2569", // violeta profundo
  },

  smallText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "700"
  },

  bigText: {
    fontSize: 26,
    color: "#4B1C56",
    fontWeight: "900"
  },

});
