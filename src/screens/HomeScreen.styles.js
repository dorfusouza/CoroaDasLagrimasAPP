import { StyleSheet } from "react-native";
import { COLORS, SPACING, RADIUS, FONTS } from "../theme";

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.fundoProfundo,
  },

  bg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },

  title: {
    fontFamily: FONTS.title,
    color: COLORS.textoClaro,
    fontSize: 34,
    lineHeight: 42,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.douradoTrans,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    marginBottom: SPACING.lg,
  },

  chipText: {
    color: COLORS.dourado,
    fontSize: 13,
    fontWeight: "600",
  },
});
