import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { styles } from "./styles";

import { IHeader } from "./models";

export const Header = ({ moves, score, onBack, onReset, onMenu }: IHeader) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerItem}>
        <Text style={styles.headerItemLabel}>Movimentos</Text>
        <Text style={styles.headerItemValue}>{moves}</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={styles.headerItemLabel}>Pontos</Text>
        <Text style={styles.headerItemValue}>{score}</Text>
      </View>

      <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
        <MaterialCommunityIcons name="arrow-left-top" size={40} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onReset} activeOpacity={0.7}>
        <MaterialCommunityIcons name="reload" size={40} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onMenu} activeOpacity={0.7}>
        <MaterialCommunityIcons name="menu" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};
