import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-950">
      <Text className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">drift-ui native</Text>
      <StatusBar style="auto" />
    </View>
  );
}
