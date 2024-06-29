import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { Stack } from "expo-router";
import React, { useContext } from "react";
import { Platform } from "react-native";
import styled from "styled-components";

const Navigation = () => {
  const { state } = useContext(GlobalContext);
  return (
    <Stack initialRouteName="/(tabs)/now">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="hourmodal"
        options={{
          title: "",
          presentation:
            Platform.OS === "ios" ? "modal" : "containedTransparentModal",
          headerShown: false,
          contentStyle: {
            bottom: 0,
            width: "100%",
            position: "absolute",
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            elevation: 8,
            backgroundColor: state.dark
              ? dark.colors.modal.bg
              : light.colors.modal.bg,
          },
        }}
      />
    </Stack>
  );
};

export default Navigation;
