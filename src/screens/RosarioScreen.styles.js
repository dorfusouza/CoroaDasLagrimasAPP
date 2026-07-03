import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONTS } from "../theme";

export default StyleSheet.create({
  /* GRADIENT (managed by GradientBackground) */
  coroaWrapper: {
    alignItems: "center",
    marginTop: SPACING.md,
  },

  /* SCROLL DO TEXTO */
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: 180,
    alignItems: "center",
  },

  title: {
    fontFamily: FONTS.title,
    fontSize: 24,
    color: COLORS.textoClaro,
    textAlign: "center",
    marginTop: 6,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textoSecundario,
    textAlign: "center",
    letterSpacing: 0.6,
    marginTop: 2,
    marginBottom: SPACING.sm,
  },

  oracao: {
    fontSize: 18,
    color: COLORS.textoClaro,
    textAlign: "center",
    lineHeight: 28,
  },

  /* BOTÕES FIXOS */
  fixedControls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 36,
    zIndex: 20,
    elevation: 20,
  },

  baseButton: {
    minWidth: 80,
    height: 56,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  smallBtn: {
    backgroundColor: `${COLORS.azulMariano}cc`,
    borderWidth: 1,
    borderColor: COLORS.douradoEscuro,
  },

  bigBtn: {
    backgroundColor: COLORS.dourado,
    borderWidth: 2,
    borderColor: COLORS.violeta,
  },

  smallText: {
    fontSize: 22,
    color: COLORS.branco,
    fontWeight: "700",
  },

  bigText: {
    fontSize: 26,
    color: COLORS.violeta,
    fontWeight: "900",
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    padding: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: SPACING.sm,
  },

  modalText: {
    fontSize: 18,
    marginBottom: SPACING.xs,
    textAlign: "center",
  },

  modalMeta: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.violeta,
    marginBottom: SPACING.md,
    textAlign: "center",
  },

  modalShare: {
    backgroundColor: COLORS.violeta,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: SPACING.sm,
  },

  modalShareText: {
    color: COLORS.branco,
    fontSize: 16,
    fontWeight: "700",
  },

  modalClose: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  modalCloseText: {
    fontSize: 16,
    color: "#444",
  },
});
