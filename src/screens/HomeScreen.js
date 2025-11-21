import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { getDiasRezados } from "../utils/storage";
import { getMetaAtiva } from "../utils/metas";

import { COLORS } from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const [dias, setDias] = useState(0);
  const [meta, setMeta] = useState(null);

  const insets = useSafeAreaInsets();

  // Atualiza dias e meta sempre que voltar para Home
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
        <View style={styles.gradientOverlay} />

        <View
          style={[
            styles.overlay,
            {
              paddingBottom: insets.bottom + 40,
              paddingTop: insets.top + 40,
            },
          ]}
        >
          <Text style={styles.title}>Nossa Senhora das Lágrimas</Text>

          <Text style={styles.sub}>Dias rezados: {dias}</Text>

          {/* ---------------------------- */}
          {/*      BLOCO DA META ATIVA     */}
          {/* ---------------------------- */}
          {meta && (
            <View style={styles.metaBox}>
              <Text style={styles.metaTitle}>🎯 Meta ativa</Text>
              <Text style={styles.metaText}>{meta.titulo}</Text>

              <Text style={styles.metaProgress}>
                {meta.progresso} / {meta.objetivo}
              </Text>

              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${(meta.progresso / meta.objetivo) * 100}%` },
                  ]}
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("MetaAtual")}
                style={styles.metaButton}
              >
                <Text style={styles.metaButtonText}>Ver minha meta</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, styles.mainButton]}
            onPress={() => navigation.navigate("Rosario")}
          >
            <Text style={styles.buttonText}>Iniciar Coroa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("DevocionarioHome")}
          >
            <Text style={styles.buttonText}>Devocionário</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.preto,
  },

  bg: {
    flex: 1,
    width: "100%",
    height: "110%",
    justifyContent: "flex-end",
  },

  bgImage: {
    resizeMode: "cover",
    backgroundColor: "#000",
  },

  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  overlay: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: 8,
  },

  sub: {
    color: "#E2C878",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "600",
  },

  /* --------------------- */
  /*      META ATIVA       */
  /* --------------------- */
  metaBox: {
    width: "85%",
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 18,
    borderRadius: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E2C878",
  },

  metaTitle: {
    color: "#E2C878",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  metaText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },

  metaProgress: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },

  progressBarBackground: {
    width: "100%",
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff3",
    overflow: "hidden",
    marginBottom: 12,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#E2C878",
  },

  metaButton: {
    backgroundColor: "#4B1C56",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  metaButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  /* --------------------- */

  button: {
    width: "75%",
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  mainButton: {
    backgroundColor: "#E2C878",
  },

  secondaryButton: {
    backgroundColor: "#4B1C56",
    borderWidth: 1,
    borderColor: "#CFAF56",
  },

  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
