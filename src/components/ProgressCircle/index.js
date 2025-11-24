import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function ProgressCircle({ progress = 0, size = 140 }) {
  const percent = Math.round(progress * 100);

  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${percent}%`,
          },
        ]}
      />
      <Text style={styles.text}>{percent}%</Text>
    </View>
  );
}
