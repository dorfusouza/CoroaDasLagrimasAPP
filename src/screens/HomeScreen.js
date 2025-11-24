import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, ImageBackground, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getDiasRezados } from "../utils/storage";
import { getMetaAtiva } from "../utils/metas";

import AppButton from "../components/AppButton";
import styles from "./HomeScreen.styles";
import MetaCard from "../components/MetaCard";

export default function HomeScreen({ navigation }) {
  const [dias, setDias] = useState(0);
  const [meta, setMeta] = useState(null);

  const insets = useSafeAreaInsets();

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

      <ImageBackground
        source={require("../../assets/nossa-senhora-lagrimas.jpg")}
        style={styles.bg}
        imageStyle={styles.bgImage}
      >
        {/* ESCURECIMENTO LEVE */}
        <View style={styles.overlay} />

        {/* CONTEÚDO */}
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top + 40,
              paddingBottom: insets.bottom + 40,
            },
          ]}
        >
          <View style={styles.contentPanel}>
            <Text style={styles.title}>Nossa Senhora das Lágrimas</Text>

            <Text style={styles.sub}>Dias rezados: {dias}</Text>

            {meta && (
              <MetaCard
                meta={meta}
                onPress={() => navigation.navigate("MetaAtual")}
              />
            )}


            {/* Botões principais */}
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
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
