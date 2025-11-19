import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import { getDias } from "../utils/storage";
import { COLORS } from "../theme/colors";

export default function HomeScreen({ navigation }) {
  const [dias, setDias] = useState(0);

  useEffect(() => {
    getDias().then(setDias);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/nossa-senhora-lagrimas.jpg")}
      style={styles.background}
      resizeMode="cover"
      blurRadius={0} // ajuste se quiser efeito devocional suave (ex: 1 ~ 5)
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>Dias rezados: {dias}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Rosario")}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    alignItems: "center",
    paddingBottom: 50,
    backgroundColor: "rgba(0,0,0,0.3)", // leve camada devocional escura
  },
  text: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
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
