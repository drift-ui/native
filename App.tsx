import "./global.css"
import { StatusBar } from "expo-status-bar"
import { ScrollView } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import { KeyValueEditor } from "@/registry/default/ui/key-value-editor"
import { Text } from "@/registry/default/ui/text"

const rows = [
  { id: "1", key: "DATABASE_URL", value: "postgres://localhost:5432/app" },
  { id: "2", key: "API_KEY", value: "sk_test_123" },
  { id: "3", key: "API_KEY", value: "sk_test_456" },
]

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView contentContainerClassName="gap-4 p-4" keyboardShouldPersistTaps="handled">
          <Text className="text-2xl font-semibold">Key Value Editor</Text>
          <KeyValueEditor defaultValue={rows} secretValues />
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
