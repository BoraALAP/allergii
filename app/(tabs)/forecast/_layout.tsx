import { global } from "@/constants/Theme";
import { MainPagesOptions } from "@/lib/screenOptions";
import { Slot, Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

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
        name="[day]"
        options={{
          headerShown: true,
        }}
      />
    </MainPagesOptions>
  );
}
