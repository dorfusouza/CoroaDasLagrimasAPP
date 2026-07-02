import React, { useState, useRef, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StatusBar,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getDiasRezados } from "../utils/storage";
import { getMetaAtiva } from "../utils/metas";
import { COLORS } from "../theme";

import AppButton from "../components/AppButton";
import AdBanner from "../components/AdBanner";
import styles from "./HomeScreen.styles";
import MetaCard from "../components/MetaCard";

const KEN_BURNS_DURATION = 18000;

export default function HomeScreen({ navigation }) {
  const [dias, setDias] = useState(0);
  const [meta, setMeta] = useState(null);

  const insets = useSafeAreaInsets();
  const scale = useRef(new Animated.Value(1)).current;

  // Efeito Ken Burns: zoom lento e contínuo na imagem de fundo
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.12,
          duration: KEN_BURNS_DURATION,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: KEN_BURNS_DURATION,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [scale]);

  // Atualiza ao focar na Home
  useFocusEffect(
    React.useCallback(() => {
      getDiasRezados().then(setDias);
      getMetaAtiva().then(setMeta);
    }, [])
  );

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <Animated.Image
        source={require("../../assets/nossa-senhora-lagrimas.jpg")}
        style={[styles.bg, { transform: [{ scale }] }]}
        resizeMode="cover"
      />

      {/* SCRIM: transparente no topo, escuro embaixo */}
      <LinearGradient
        colors={[
          "rgba(16,20,46,0.10)",
          "rgba(16,20,46,0.55)",
          COLORS.fundoProfundo,
        ]}
        locations={[0.3, 0.62, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* CONTEÚDO */}
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom + 12 },
        ]}
      >
        <Text style={styles.title}>Nossa Senhora{"\n"}das Lágrimas</Text>

        <View style={styles.chip}>
          <MaterialCommunityIcons
            name="fire"
            size={15}
            color={COLORS.dourado}
          />
          <Text style={styles.chipText}>
            {dias} {dias === 1 ? "dia rezado" : "dias rezados"}
          </Text>
        </View>

        {meta && (
          <MetaCard
            meta={meta}
            onPress={() => navigation.navigate("MetaAtual")}
          />
        )}

        <AppButton
          label="Iniciar Coroa"
          mode="primary"
          onPress={() => navigation.navigate("Rosario")}
        />

        <AppButton
          label="Devocionário"
          mode="secondary"
          onPress={() => navigation.navigate("DevocionarioHome")}
        />

        <AdBanner />
      </View>
    </View>
  );
}
