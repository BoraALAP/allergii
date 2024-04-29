import { MainPagesOptions } from "@/lib/screenOptions";
import { Slot, Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <MainPagesOptions>
      <Stack.Screen
        name="index"
        options={{
          title: "Forecast",
        }}
      />
      <Stack.Screen
        name="[hour]"
        options={{
          title: "Hour",
        }}
      />
      <Stack.Screen
        name="[day]"
        options={{
          title: "Day",
        }}
      />
    </MainPagesOptions>
  );
}
