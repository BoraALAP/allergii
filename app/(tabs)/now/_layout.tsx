import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { MainPagesOptions } from "@/lib/screenOptions";
import { View } from "@/ui/Containers";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import { useContext } from "react";
import { Pressable } from "react-native";
import styled from "styled-components";

export default function Layout() {
  const { state } = useContext(GlobalContext);
  return (
    <MainPagesOptions>
      <Stack.Screen
        name="index"
        options={{
          // title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="hourmodal"
        options={{
          title: "AI Suggestion",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="alertmodal"
        options={{
          title: "Alert",
          presentation: "modal",
        }}
      />
    </MainPagesOptions>
  );
}
