import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../theme";

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.preto,
  },

  bg: {
    flex: 1,
    width: "100%",
    height: "110%",  // 🔥 EVITA A LINHA BRANCA NO APK
    justifyContent: "flex-end",
  },

  bgImage: {
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  container: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    color: COLORS.branco,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: SPACING.xs,
  },

  sub: {
    color: COLORS.dourado,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: SPACING.lg,
  },

  metaBox: {
    width: "85%",
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: SPACING.md,
    borderRadius: 20,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.dourado,
  },

  metaTitle: {
    color: COLORS.dourado,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SPACING.xs,
  },

  metaText: {
    color: COLORS.branco,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },

  metaProgress: {
    color: COLORS.branco,
    fontSize: 16,
    textAlign: "center",
    marginTop: SPACING.xs,
  },

  progressBarBackground: {
    width: "100%",
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.brancoTrans,
    overflow: "hidden",
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.dourado,
  },
  contentPanel: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.45)",   // fundo translúcido
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: "center",
  },


});
