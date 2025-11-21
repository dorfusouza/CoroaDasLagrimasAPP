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

export default function RosarioScreen({ navigation }) {
  const seq = gerarSequencia();
  const [index, setIndex] = useState(0);

  const etapa = seq[index];

  const fade = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const totalCircleBeads = 56;
  const angleStep = (2 * Math.PI) / totalCircleBeads;

  function avancar() {
    if (etapa.tipo === "jaculatoria" && etapa.face === 2) {
      Animated.sequence([
        Animated.timing(fade, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start(() => next());
    } else {
      next();
    }

    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Haptics.selectionAsync();

  }

  function next() {
    if (index < seq.length - 1) setIndex(index + 1);
    else finalizar();
  }

  function voltar() {
    if (index === 0) {
      navigation.navigate("Home");
      return;
    }
    setIndex(index - 1);
  }

  async function finalizar() {
    await incDias();
    navigation.navigate("Home");
  }

  function pressIn() {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }

  const renderCoroaCompleta = () => {
    const contas = [];

    for (let i = 0; i < totalCircleBeads; i++) {
      const offset = Math.PI / 2;
      const x = Math.cos(-i * angleStep + offset) * 120;
      const y = Math.sin(-i * angleStep + offset) * 120;

      const isActive = index > i;
      const isMajor = i % 8 === 0;

      contas.push(
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

    const finais = [0, 1, 2].map((i) => {
      const active = index > totalCircleBeads + i;
      return (
        <View
          key={"final-" + i}
          style={[
            styles.bead,
            styles.bigBead,
            active ? styles.active : styles.inactive,
            { marginVertical: 2 },
          ]}
        />
      );
    });

    return (
      <View style={styles.coroaBloco}>
        <View style={styles.circleContainer}>{contas}</View>

        <View style={styles.finalBeads}>{finais}</View>

        <Animated.Image
          source={
            etapa.tipo === "jaculatoria" && etapa.face === 1
              ? require("../../assets/medalha-verso.png")
              : require("../../assets/medalha-frente.png")
          }
          style={[styles.medalha, { opacity: fade }]}
        />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#19204A", "#4B1C56", "#CFAF56"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >

      {/* COROA FIXA */}
      <View style={styles.coroaWrapper}>{renderCoroaCompleta()}</View>

      {/* TEXTO NO TOPO */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{etapa.tipo.toUpperCase()}</Text>
        <Text style={styles.oracao}>{etapa.texto}</Text>
      </ScrollView>

      {/* BOTÕES */}
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

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  // TEXTO no topo, rola SEM encostar na coroa
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 420, // 👉 garante que NUNCA chega na coroa
    alignItems: "center",
  },

  // POSIÇÃO C – um pouco abaixo do centro, bem fixa
  coroaWrapper: {
    position: "absolute",
    top: "42%", // 👉 ajuste fino (C)
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 50,
  },

  coroaBloco: {
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F9F7F3",
    marginBottom: 10,
    textAlign: "center",
  },

  oracao: {
    fontSize: 18,
    color: "#F9F7F3",
    lineHeight: 28,
    marginHorizontal: 20,
    textAlign: "center",
  },

  medalha: {
    width: 85,
    height: 110,
    resizeMode: "contain",
    marginTop: 10,
  },

  circleContainer: {
    width: 260,
    height: 260,
    position: "relative",
  },

  finalBeads: {
    alignItems: "center",
    marginTop: 4,
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
  },

  active: {
    backgroundColor: "#E2C878",
    borderWidth: 1,
    borderColor: "#C9A200",
  },

  inactive: {
    backgroundColor: "#D7D7D7",
    opacity: 0.7,
  },

  fixedControls: {
    position: "absolute",
    bottom: 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },

  baseButton: {
    minWidth: 80,
    height: 56,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    elevation: 4,
  },

  smallBtn: {
    backgroundColor: "#3B4C97cc",
    borderWidth: 1,
    borderColor: "#93A4E8",
  },

  bigBtn: {
    backgroundColor: "#E2C878",
    borderWidth: 2,
    borderColor: "#7A2569",
  },

  smallText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  bigText: {
    fontSize: 26,
    color: "#4B1C56",
    fontWeight: "900",
  },
});
