import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";

export default StyleSheet.create({
  button: {
    width: "75%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: SPACING.sm,
    shadowColor: COLORS.preto,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  primary: {
    backgroundColor: COLORS.dourado,
  },

  secondary: {
    backgroundColor: COLORS.violeta,
    borderWidth: 1,
    borderColor: COLORS.douradoEscuro,
  },

  label: {
    fontSize: 18,
    color: COLORS.branco,
    fontWeight: "bold",
  },
});
