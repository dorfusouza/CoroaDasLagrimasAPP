import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../theme";

export default function GradientBackground({ children }) {
  return (
    <LinearGradient
      colors={[COLORS.fundoEscuro, COLORS.fundoRoxo, COLORS.douradoEscuro]}
    //   colors={["#19204A", "#4B1C56", "#CFAF56"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
