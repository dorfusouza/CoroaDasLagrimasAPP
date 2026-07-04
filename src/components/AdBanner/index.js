import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BANNER_ID } from "../../utils/ads";
import { COLORS, SPACING, RADIUS, FONTS } from "../../theme";

export default function AdBanner() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />

      <TouchableOpacity
        style={styles.infoRow}
        activeOpacity={0.7}
        onPress={() => setShowInfo(true)}
      >
        <MaterialCommunityIcons
          name="information-outline"
          size={13}
          color={COLORS.textoSecundario}
        />
        <Text style={styles.infoText}>Por que há anúncios aqui?</Text>
      </TouchableOpacity>

      <Modal visible={showInfo} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.box}>
            <View style={styles.iconChip}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={22}
                color={COLORS.dourado}
              />
            </View>

            <Text style={styles.title}>Um app gratuito, sempre</Text>

            <Text style={styles.text}>
              O Coroa das Lágrimas é e sempre será gratuito. Optamos por
              anúncios discretos — em vez de cobrar dos fiéis — para manter o
              aplicativo no ar e ajudar a difundir a devoção a Nossa Senhora
              das Lágrimas ao maior número de pessoas possível.
            </Text>

            <Text style={styles.text}>
              Cada anúncio exibido é o que sustenta este espaço de oração.
              Obrigado por rezar conosco. 🙏
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowInfo(false)}
            >
              <Text style={styles.closeText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 4,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },

  infoText: {
    fontSize: 11,
    color: COLORS.textoSecundario,
    textDecorationLine: "underline",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },

  box: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.surfaceSolida,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.douradoBordaSuave,
    padding: SPACING.lg,
    alignItems: "center",
  },

  iconChip: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.chip,
    backgroundColor: COLORS.douradoTrans,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },

  title: {
    fontFamily: FONTS.title,
    fontSize: 19,
    color: COLORS.textoClaro,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textoClaro,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },

  closeBtn: {
    marginTop: SPACING.xs,
    backgroundColor: COLORS.dourado,
    paddingVertical: 10,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.pill,
  },

  closeText: {
    color: COLORS.violeta,
    fontWeight: "700",
    fontSize: 15,
  },
});
