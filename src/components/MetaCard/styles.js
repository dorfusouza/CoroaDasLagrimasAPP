import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../theme";

export default StyleSheet.create({
  card: {
    width: "85%",
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: SPACING.md,
    borderRadius: 20,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.dourado,
    alignSelf: "center",
  },

  title: {
    color: COLORS.dourado,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SPACING.xs,
  },

  text: {
    color: COLORS.branco,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },

  progressText: {
    color: COLORS.branco,
    fontSize: 16,
    textAlign: "center",
    marginTop: SPACING.sm,
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

  // ⭐ SOLUÇÃO PARA CENTRALIZAR O BOTÃO
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
});
