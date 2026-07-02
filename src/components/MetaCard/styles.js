import { StyleSheet } from "react-native";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: COLORS.surfaceEscura,
    padding: SPACING.md,
    borderRadius: RADIUS.card,
    marginBottom: SPACING.lg,
    alignSelf: "center",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  label: {
    color: COLORS.textoSecundario,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },

  progressLabel: {
    color: COLORS.dourado,
    fontSize: 13,
    fontWeight: "600",
  },

  title: {
    color: COLORS.textoClaro,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: SPACING.sm,
  },

  progressBarBackground: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: COLORS.dourado,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: SPACING.sm,
    gap: 2,
  },

  footerText: {
    color: COLORS.dourado,
    fontSize: 13,
    fontWeight: "600",
  },
});
