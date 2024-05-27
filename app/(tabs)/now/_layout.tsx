import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { MainPagesOptions } from "@/lib/screenOptions";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Link, Stack, useNavigation } from "expo-router";
import { useContext } from "react";
import { Platform, TouchableOpacity, useColorScheme } from "react-native";

export default function Layout() {
  const { state } = useContext(GlobalContext);
  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  return (
    <MainPagesOptions>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: true,
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerStyle: {
            backgroundColor:
              Platform.OS === "ios"
                ? "transparent"
                : state.dark
                ? dark.colors.page.bg.start
                : light.colors.page.bg.start,
          },
          headerRight: () => (
            <TouchableOpacity>
              <Link
                href="/(tabs)/now/searchmodal"
                style={{
                  color: state.dark
                    ? dark.colors.primary
                    : light.colors.primary,
                  padding: 12,
                }}
              >
                <FontAwesome
                  name="search"
                  color={
                    state.dark ? dark.colors.secondary : light.colors.secondary
                  }
                  size={16}
                />
              </Link>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="alertmodal"
        options={{
          title: "Alert",
          presentation: "modal",
          contentStyle: {
            bottom: 0,
            width: "100%",
            position: "absolute",
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
          },
        }}
      />
      <Stack.Screen
        name="searchmodal"
        options={{
          title: "",
          presentation: "modal",
          headerShown: true,
          headerStyle: {
            backgroundColor:
              Platform.OS === "ios"
                ? "transparent"
                : state.dark
                ? dark.colors.page.bg.start
                : light.colors.page.bg.start,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 12 }}
            >
              <FontAwesome
                name="close"
                color={state.dark ? dark.colors.primary : light.colors.primary}
                size={16}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </MainPagesOptions>
  );
}
