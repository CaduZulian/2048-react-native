import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },

  cardContainer: {
    margin: 32,
    gap: 8,
    padding: 12,
    backgroundColor: "#000",
  },

  cardRow: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },

  cardItem: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#777",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  cardValue: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
  },

  hudContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    padding: 16,
    paddingTop: getStatusBarHeight() + 16,
    backgroundColor: "#000",
  },

  hudItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#333",
  },

  hudItemLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  hudItemValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
});
