import React from "react";
import { View, Animated } from "react-native";
import styles from "./styles";

export default function Rosary({ index, etapa, totalCircleBeads, fade, renderItems }) {
  // renderItems é uma função que retorna a lista de conta <View /> (posicionados)
  const items = renderItems();

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>{items}</View>

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
            ? require("../../../assets/medalha-verso.png")
            : require("../../../assets/medalha-frente.png")
        }
        style={[styles.medalha, { opacity: fade }]}
      />
    </View>
  );
}
