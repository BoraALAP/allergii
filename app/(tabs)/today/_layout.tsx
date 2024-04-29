import { MainPagesOptions } from "@/lib/screenOptions";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <MainPagesOptions>
      <Stack.Screen
        name="index"
        options={{
          title: "Today",
        }}
      />

      <Stack.Screen
        name="[hour]"
        // getId={({ params }) => String(Date.now())}
        options={{
          title: "Hour",
        }}
      />
    </MainPagesOptions>
  );
}
