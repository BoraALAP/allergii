import React, { useContext } from "react";

import { Tabs } from "expo-router";

import { dark, global, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { NowIcon } from "@/assets/icons/now";
import { NowActiveIcon } from "@/assets/icons/nowactive";
import { SettingsIcon } from "@/assets/icons/settings";
import { SettingsActiveIcon } from "@/assets/icons/settingsactive";
import { DailyIcon } from "@/assets/icons/daily";
import { DailyActiveIcon } from "@/assets/icons/dailyactive";

export default function TabLayout() {
  const { state } = useContext(GlobalContext);

  const tabSelectedIconColor = state.dark
    ? dark.colors.tabBar.selected.icon
    : light.colors.tabBar.selected.icon;

  const tabIconColor = state.dark
    ? dark.colors.tabBar.default.icon
    : light.colors.tabBar.default.icon;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: state.dark
          ? dark.colors.tabBar.selected.text
          : light.colors.tabBar.selected.text,
        tabBarInactiveTintColor: state.dark
          ? dark.colors.tabBar.default.text
          : light.colors.tabBar.default.text,
        tabBarLabelStyle: {
          fontFamily: global.font.family.primaryBold,
        },
        tabBarStyle: {
          backgroundColor: state.dark
            ? dark.colors.page.bg.start
            : light.colors.page.bg.start,
        },
      }}
    >
      <Tabs.Screen redirect name="index" />
      <Tabs.Screen
        name="now"
        options={{
          title: "Now",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <NowActiveIcon color={tabSelectedIconColor} />;
            } else {
              return <NowIcon color={tabIconColor} />;
            }
          },
        }}
      />

      <Tabs.Screen
        name="forecast"
        options={{
          title: "Forecast",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <DailyActiveIcon color={tabSelectedIconColor} />;
            } else {
              return <DailyIcon color={tabIconColor} />;
            }
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <SettingsActiveIcon color={tabSelectedIconColor} />;
            } else {
              return <SettingsIcon color={tabIconColor} />;
            }
          },
        }}
      />
    </Tabs>
  );
}
