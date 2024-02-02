import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },

  cardContainer: {
    position: "relative",
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
    fontWeight: "600",
  },
});
