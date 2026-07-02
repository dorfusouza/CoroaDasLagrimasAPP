import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";
import { SPACING, RADIUS } from "../../theme/spacing";

export default StyleSheet.create({
  wrapper: {
    width: "80%",
    marginVertical: SPACING.sm,
  },

  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: RADIUS.pill,
    alignItems: "center",
  },

  primary: {
    backgroundColor: COLORS.dourado,
  },

  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.douradoBordaSuave,
  },

  label: {
    fontSize: 17,
    fontWeight: "600",
  },

  labelPrimary: {
    color: COLORS.violeta,
  },

  labelSecondary: {
    color: COLORS.dourado,
  },
});
