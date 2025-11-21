import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { getDias } from "../utils/storage";
import { COLORS } from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const [dias, setDias] = useState(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getDias().then(setDias);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require("../../assets/nossa-senhora-lagrimas.jpg")}
        style={styles.bg}
        imageStyle={styles.bgImage}
      >
        {/* DEGRADÊ SUTIL PARA LEITURA */}
        <View style={styles.gradientOverlay} />

        {/* CONTEÚDO PRINCIPAL */}
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
    backgroundColor: "#000",
  },

  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    marginBottom: 35,
    fontWeight: "600",
  },

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
