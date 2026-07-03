import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export default StyleSheet.create({
  container: {
    width: 264,
    height: 440,
    alignSelf: "center",
    marginBottom: 8,
  },

  beadDone: {
    backgroundColor: COLORS.dourado,
    borderWidth: 1,
    borderColor: COLORS.douradoEscuro,
  },

  beadCurrent: {
    backgroundColor: "#F0DFA8",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  beadTodo: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
  },

  beadTodoMajor: {
    borderColor: COLORS.douradoBordaSuave,
  },

  halo: {
    position: "absolute",
    backgroundColor: COLORS.dourado,
  },

  pendant: {
    position: "absolute",
    top: 254,
    width: "100%",
    alignItems: "center",
  },

  finalBeads: {
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },

  medalha: {
    width: 84,
    height: 108,
    resizeMode: "contain",
  },
});
