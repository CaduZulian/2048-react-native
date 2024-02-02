import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    padding: 16,
    paddingTop: getStatusBarHeight() + 16,
    backgroundColor: "#000",
  },

  headerItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#333",
  },

  headerItemLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  headerItemValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
});
