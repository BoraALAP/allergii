import React, { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import { dark, light } from "@/constants/Theme";
import { useColorScheme } from "react-native";
import { GlobalContext } from "@/context/global";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => {
  const colorScheme = useColorScheme();
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
};

export default function TabLayout() {
  const { state } = useContext(GlobalContext);

  return (
    <Tabs
      initialRouteName="now"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: state.dark
          ? dark.colors.tabBar.selected.text
          : light.colors.tabBar.selected.text,
        tabBarInactiveTintColor: state.dark
          ? dark.colors.tabBar.default.text
          : light.colors.tabBar.default.text,
      }}
    >
      <Tabs.Screen
        name="now"
        options={{
          title: "Now",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="code"
              color={
                focused
                  ? state.dark
                    ? dark.colors.tabBar.selected.icon
                    : light.colors.tabBar.selected.icon
                  : state.dark
                  ? dark.colors.tabBar.default.icon
                  : light.colors.tabBar.default.icon
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="code"
              color={
                focused
                  ? state.dark
                    ? dark.colors.tabBar.selected.icon
                    : light.colors.tabBar.selected.icon
                  : state.dark
                  ? dark.colors.tabBar.default.icon
                  : light.colors.tabBar.default.icon
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="forecast"
        options={{
          title: "Forecast",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="code"
              color={
                focused
                  ? state.dark
                    ? dark.colors.tabBar.selected.icon
                    : light.colors.tabBar.selected.icon
                  : state.dark
                  ? dark.colors.tabBar.default.icon
                  : light.colors.tabBar.default.icon
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="code"
              color={
                focused
                  ? state.dark
                    ? dark.colors.tabBar.selected.icon
                    : light.colors.tabBar.selected.icon
                  : state.dark
                  ? dark.colors.tabBar.default.icon
                  : light.colors.tabBar.default.icon
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
