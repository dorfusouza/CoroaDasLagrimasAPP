import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export default StyleSheet.create({
  circle: {
    borderWidth: 6,
    borderColor: COLORS.brancoTrans,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 20,
  },

  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.dourado,
  },

  text: {
    color: COLORS.branco,
    fontSize: 28,
    fontWeight: "bold",
  },
});
