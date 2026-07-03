import React, { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import styles from "./styles";

// Geometria da coroa: anel de 56 contas, pendente com 3 contas finais
// descendo até a medalha — como na coroa física.
const SIZE = 264;
const CENTER = SIZE / 2;
const RING_RADIUS = 118;
const SMALL = 12;
const BIG = 18;
const FINAL = 13;

function Bead({ size, isMajor, isDone, isCurrent, halo }) {
  return (
    <View style={{ width: size, height: size }}>
      {isCurrent && (
        <Animated.View
          style={[
            styles.halo,
            {
              width: size * 2,
              height: size * 2,
              borderRadius: size,
              left: -size / 2,
              top: -size / 2,
              opacity: halo.opacity,
              transform: [{ scale: halo.scale }],
            },
          ]}
        />
      )}
      <View
        style={[
          { width: size, height: size, borderRadius: size / 2 },
          isDone || isCurrent ? styles.beadDone : styles.beadTodo,
          !isDone && !isCurrent && isMajor && styles.beadTodoMajor,
          isCurrent && styles.beadCurrent,
        ]}
      />
    </View>
  );
}

export default function Rosary({ index, etapa, totalCircleBeads }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const flip = useRef(new Animated.Value(0)).current;

  // face da medalha exibida no momento — muda com um efeito de "virar"
  // quando a etapa muda de/para a jaculatória do Jesus Manietado (verso)
  const desiredFace = etapa.tipo === "jaculatoria" && etapa.face === 1 ? "verso" : "frente";
  const [shownFace, setShownFace] = useState(desiredFace);

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 850, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 850, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  useEffect(() => {
    if (desiredFace === shownFace) return;
    Animated.timing(flip, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;
      setShownFace(desiredFace);
      flip.setValue(0);
      Animated.timing(flip, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desiredFace]);

  const halo = {
    scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.35] }),
    opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0.15] }),
  };

  const flipRotate = flip.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "90deg"] });
  const flipScale = flip.interpolate({ inputRange: [0, 1], outputRange: [1, 0.75] });

  const angleStep = (2 * Math.PI) / totalCircleBeads;

  const ringBeads = [];
  for (let i = 0; i < totalCircleBeads; i++) {
    const angle = -i * angleStep + Math.PI / 2;
    const x = CENTER + Math.cos(angle) * RING_RADIUS;
    const y = CENTER + Math.sin(angle) * RING_RADIUS;

    const isMajor = i % 8 === 0;
    const size = isMajor ? BIG : SMALL;
    const seqPos = i + 1;

    ringBeads.push(
      <View
        key={i}
        style={{ position: "absolute", left: x - size / 2, top: y - size / 2 }}
      >
        <Bead
          size={size}
          isMajor={isMajor}
          isDone={index > seqPos}
          isCurrent={index === seqPos}
          halo={halo}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {ringBeads}

      {/* pendente: 3 contas finais na vertical, medalha ao final */}
      <View style={styles.pendant}>
        <View style={styles.finalBeads}>
          {[0, 1, 2].map((i) => {
            const seqPos = totalCircleBeads + 1 + i;
            return (
              <Bead
                key={i}
                size={FINAL}
                isDone={index > seqPos}
                isCurrent={index === seqPos}
                halo={halo}
              />
            );
          })}
        </View>

        <Animated.Image
          source={
            shownFace === "verso"
              ? require("../../../assets/medalha-verso.png")
              : require("../../../assets/medalha-frente.png")
          }
          style={[
            styles.medalha,
            {
              transform: [
                { perspective: 800 },
                { rotateY: flipRotate },
                { scaleX: flipScale },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}
