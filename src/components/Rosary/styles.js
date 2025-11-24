import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  circleContainer: {
    width: 260,
    height: 260,
    position: "relative",
  },

  bead: {
    borderRadius: 999,
  },

  bigBead: {
    width: 22,
    height: 22,
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
});
