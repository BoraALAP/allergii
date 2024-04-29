import { MainPagesOptions } from "@/lib/screenOptions";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <MainPagesOptions>
      <Stack.Screen name="index" options={{ title: "Settings" }} />
    </MainPagesOptions>
  );
}
