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
        {/* Conteúdo protegido pela área segura */}
        <View style={[styles.overlay, { paddingBottom: insets.bottom + 40 }]}>
          <Text style={styles.text}>Dias rezados: {dias}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Rosario")}
          >
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 20, backgroundColor: "#4B1C56" }]}
            onPress={() => navigation.navigate("Devocionario")}
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
    height: "110%",  // força cobertura da tela
    justifyContent: "flex-end",
  },

  bgImage: {
    resizeMode: "cover",
    backgroundColor: "#000",  // elimina qualquer pixel branco
  },

  overlay: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  text: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: COLORS.violeta,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },

  buttonText: {
    fontSize: 20,
    color: COLORS.branco,
    fontWeight: "bold",
  },
});
