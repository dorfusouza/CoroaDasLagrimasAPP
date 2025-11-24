import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../theme";

export default StyleSheet.create({
  /* GRADIENT (managed by GradientBackground) */
  coroaWrapper: {
    alignItems: "center",
    marginTop: SPACING.md,
  },

  /* COROA (os estilos das contas também usados pelo Rosary) */
  bead: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  bigBead: {
    width: 22,
    aspectRatio: 1,
  },

  smallBead: {
    width: 16,
    height: 16,
  },

  active: {
    backgroundColor: COLORS.contaAtiva,
    borderWidth: 1,
    borderColor: COLORS.contaAtivaBorda,
    shadowColor: COLORS.contaAtiva,
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },

  inactive: {
    backgroundColor: COLORS.contaInativa,
    opacity: 0.8,
  },

  finalBeads: {
    marginTop: 10,
  },

  medalha: {
    width: 85,
    height: 110,
    resizeMode: "contain",
    marginTop: 4,
  },

  /* SCROLL DO TEXTO */
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: 180,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textoClaro,
    textAlign: "center",
    marginBottom: 6,
    marginTop: 10,
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
