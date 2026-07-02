import React, { useRef } from "react";
import { Pressable, Text, Animated } from "react-native";

import styles from "./styles";

export default function AppButton({ label, onPress, mode = "primary" }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();

  const pressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[
          styles.button,
          mode === "primary" ? styles.primary : styles.secondary,
        ]}
      >
        <Text
          style={[
            styles.label,
            mode === "primary" ? styles.labelPrimary : styles.labelSecondary,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
