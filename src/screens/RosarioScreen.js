import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Modal,
  Share,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import GradientBackground from "../components/GradientBackground";
import Rosary from "../components/Rosary";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";

import { registrarDiaRezados } from "../utils/storage";
import { registrarProgressoMetaAoFinalizar } from "../utils/metas";
import { gerarSequencia } from "../data/oracoes";

import styles from "./RosarioScreen.styles";

export default function RosarioScreen({ navigation }) {
  const seq = gerarSequencia();
  const [index, setIndex] = useState(0);

  // Meta/confetti/modal
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [metaConcluida, setMetaConcluida] = useState(null);

  const insets = useSafeAreaInsets();

  const etapa = seq[index];
  const totalCircleBeads = 56;
  const angleStep = (2 * Math.PI) / totalCircleBeads;

  // animações
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

  // render circle beads array (positions) — devolve elementos para Rosary
  const renderCircleItems = () => {
    const items = [];
    for (let i = 0; i < totalCircleBeads; i++) {
      const offset = Math.PI / 2;
      const x = Math.cos(-i * angleStep + offset) * 120;
      const y = Math.sin(-i * angleStep + offset) * 120;

      const isActive = index > i || index > totalCircleBeads;
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
      {/* confetti */}
      {showConfetti && <ConfettiCannon count={150} origin={{ x: 200, y: 0 }} fadeOut />}

      {/* modal de parabéns */}
      <Modal
        visible={showCongrats}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowCongrats(false);
          setShowConfetti(false);
          navigation.navigate("Home");
        }}
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
                setShowConfetti(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <GradientBackground>
        {/* COROA FIXA */}
        <View style={[styles.coroaWrapper, { paddingTop: insets.top + 18 }]}>
          <Rosary
            index={index}
            etapa={etapa}
            totalCircleBeads={totalCircleBeads}
            fade={fade}
            renderItems={renderCircleItems}
          />
        </View>

        {/* TEXTO NO TOPO (scroll apenas do texto) */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{etapa.tipo.toUpperCase()}</Text>
          <Text style={styles.oracao}>{etapa.texto}</Text>
        </ScrollView>

        {/* BOTÕES FIXOS */}
        <View style={[styles.fixedControls, { bottom: 40 + (insets.bottom || 0) }]}>
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
      </GradientBackground>
    </View>
  );
}
