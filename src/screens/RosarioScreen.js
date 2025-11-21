import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
  Modal,
  Share,
} from "react-native";

import { gerarSequencia } from "../data/oracoes";
import { registrarDiaRezados } from "../utils/storage";
import { registrarProgressoMetaAoFinalizar } from "../utils/metas";

import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

export default function RosarioScreen({ navigation }) {
  const seq = gerarSequencia();
  const [index, setIndex] = useState(0);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [metaConcluida, setMetaConcluida] = useState(null);

  const etapa = seq[index];
  const totalCircleBeads = 56;
  const angleStep = (2 * Math.PI) / totalCircleBeads;

  const fade = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  function avancar() {
    if (etapa.tipo === "jaculatoria" && etapa.face === 2) {
      Animated.sequence([
        Animated.timing(fade, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start(() => next());
    } else next();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  function next() {
    if (index < seq.length - 1) setIndex(index + 1);
    else finalizar();
  }

  function voltar() {
    if (index > 0) setIndex(index - 1);
    else navigation.navigate("Home");
  }

  async function finalizar() {
    const isNewDay = await registrarDiaRezados();
    const novenaDia = null;

    const { meta, concluida } = await registrarProgressoMetaAoFinalizar({
      isNewDay,
      novenaDia,
    });

    if (concluida) {
      setMetaConcluida(meta);
      setShowConfetti(true);
      setShowCongrats(true);
      return;
    }

    navigation.navigate("Home");
  }

  function pressIn() {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true }).start();
  }

  function pressOut() {
    Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  }

  // COROA COMPLETA EM UM COMPONENTE INDEPENDENTE
  const renderCoroaCompleta = () => (
    <View style={styles.coroaContainer}>
      <View style={styles.circleContainer}>{renderCircle()}</View>

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

  const renderCircle = () => {
    const items = [];
    for (let i = 0; i < totalCircleBeads; i++) {
      const offset = Math.PI / 2;
      const x = Math.cos(-i * angleStep + offset) * 120;
      const y = Math.sin(-i * angleStep + offset) * 120;

      const isActive = index > i || index > 56;
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
    return items;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* CONFETES */}
      {showConfetti && (
        <ConfettiCannon count={150} origin={{ x: 200, y: 0 }} fadeOut />
      )}

      {/* MODAL */}
      <Modal
        visible={showCongrats}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCongrats(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🎉 Parabéns!</Text>
            <Text style={styles.modalText}>Você concluiu a meta:</Text>
            <Text style={styles.modalMeta}>{metaConcluida?.titulo}</Text>

            <TouchableOpacity
              style={styles.modalShare}
              onPress={async () => {
                await Share.share({
                  message:
                    `Concluí minha meta: "${metaConcluida?.titulo}". ` +
                    `Venha rezar comigo no app Nossa Senhora das Lágrimas 💧`,
                });
              }}
            >
              <Text style={styles.modalShareText}>Compartilhar conquista</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => {
                setShowCongrats(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <LinearGradient
        colors={["#19204A", "#4B1C56", "#CFAF56"]}
        style={styles.gradient}
      >

        {/* COROA FIXA */}
        <View style={styles.coroaWrapper}>{renderCoroaCompleta()}</View>

        {/* SCROLL APENAS DO TEXTO */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{etapa.tipo.toUpperCase()}</Text>
          <Text style={styles.oracao}>{etapa.texto}</Text>
        </ScrollView>

        {/* BOTÕES FIXOS */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  /* ===========================
     COROA FIXA (BLOCO CENTRAL)
  ============================ */
  coroaWrapper: {
    alignItems: "center",
    marginTop: 40,
  },

  coroaContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  circleContainer: {
    width: 260,
    height: 260,
    position: "relative",
  },

  /* ===========================
     SCROLL DO TEXTO
  ============================ */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 180,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F9F7F3",
    textAlign: "center",
    marginBottom: 6,
    marginTop: 10,
  },

  oracao: {
    fontSize: 18,
    color: "#F9F7F3",
    textAlign: "center",
    lineHeight: 28,
  },

  /* ===========================
     CONTAS / MEDALHA
  ============================ */
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
    shadowColor: "#E2C878",
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },

  inactive: {
    backgroundColor: "#D7D7D7",
    opacity: 0.8,
  },

  finalBeads: { marginTop: 10 },

  medalha: {
    width: 85,
    height: 110,
    resizeMode: "contain",
    marginTop: 4,
  },

  /* ===========================
     BOTÕES FIXOS
  ============================ */
  fixedControls: {
    position: "absolute",
    bottom: 40,
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

  /* ===========================
     MODAL
  ============================ */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalText: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center",
  },

  modalMeta: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7A2569",
    marginBottom: 20,
    textAlign: "center",
  },

  modalShare: {
    backgroundColor: "#4B1C56",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },

  modalShareText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  modalClose: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  modalCloseText: {
    fontSize: 16,
    color: "#444",
  },
});
