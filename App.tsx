import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { Game } from "./src/pages";

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Game />
    </SafeAreaView>
  );
}
