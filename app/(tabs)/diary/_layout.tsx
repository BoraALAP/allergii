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
          title: "Diary",
        }}
      />
      <Stack.Screen
        name="addDay"
        options={{
          title: "How you are feeling today?",
        }}
      />
    </MainPagesOptions>
  );
}
