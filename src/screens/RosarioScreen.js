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
import { MaterialCommunityIcons } from "@expo/vector-icons";

import GradientBackground from "../components/GradientBackground";
import Rosary from "../components/Rosary";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";

import { registrarDiaRezados } from "../utils/storage";
import { registrarProgressoMetaAoFinalizar } from "../utils/metas";
import { gerarSequencia } from "../data/oracoes";
import { loadInterstitial } from "../utils/ads";

import { COLORS } from "../theme";
import styles from "./RosarioScreen.styles";

const TIPO_LABEL = {
  oferecimento: "Oferecimento",
  "conta-maior": "Conta maior",
  "conta-menor": "Conta menor",
  "conta-final": "Conta final",
  oremos: "Oremos",
  jaculatoria: "Jaculatória",
};

function subtitulo(etapa) {
  if (etapa.tipo === "conta-maior") return `${etapa.grupo}º grupo de 7`;
  if (etapa.tipo === "conta-menor")
    return `${etapa.grupo}º grupo · conta ${etapa.ordem} de 7`;
  if (etapa.tipo === "conta-final") return `Conclusão · conta ${etapa.ordem} de 3`;
  if (etapa.tipo === "oremos") return "Oração final";
  if (etapa.tipo === "jaculatoria") return "Jaculatória final";
  return "Início da Coroa";
}

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

  // animações
  const scale = useRef(new Animated.Value(1)).current;

  function avancar() {
    next();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  function next() {
    if (index < seq.length - 1) setIndex(index + 1);
    else finalizar();
  }

  function voltar() {
    if (index > 0) setIndex(index - 1);
    else navigation.goBack();
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

    // Mostrar intersticial antes de voltar à Home
    loadInterstitial(() => navigation.navigate("Home"));
  }

  function pressIn() {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true }).start();
  }

  function pressOut() {
    Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  }

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
              style={styles.modalShare}
              onPress={() => {
                setShowCongrats(false);
                setShowConfetti(false);
                navigation.navigate("MetaCriar");
              }}
            >
              <Text style={styles.modalShareText}>Criar nova meta</Text>
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
          />
        </View>

        {/* TEXTO NO TOPO (scroll apenas do texto) */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{TIPO_LABEL[etapa.tipo] || etapa.tipo}</Text>
          <Text style={styles.subtitle}>{subtitulo(etapa)}</Text>
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
              <MaterialCommunityIcons
                name="chevron-left"
                size={30}
                color={COLORS.branco}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
              onPressIn={pressIn}
              onPressOut={pressOut}
              onPress={avancar}
              style={[styles.baseButton, styles.bigBtn]}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                size={32}
                color={COLORS.violeta}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </GradientBackground>
    </View>
  );
}
