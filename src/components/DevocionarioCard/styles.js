import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.violeta,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.dourado,
  },

  icon: {
    fontSize: 26,
    marginRight: SPACING.md,
    color: COLORS.dourado,
  },

  title: {
    fontSize: 18,
    color: COLORS.branco,
    fontWeight: "bold",
  },
});
