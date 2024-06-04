import { dark, global, light } from "@/constants/Theme";
import { Stack } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import { GlobalContext } from "@/context/global";
import { useContext } from "react";

export const MainPagesOptions = ({ children }: React.PropsWithChildren) => {
  const { state } = useContext(GlobalContext);
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: state.dark ? dark.colors.body : light.colors.body,
          fontFamily: global.font.family.primaryBold,
        },
        headerShadowVisible: false,
        headerTransparent: Platform.OS === "ios" ? true : false,
        headerShown: Platform.OS === "ios" ? false : true,
        headerStyle: {
          backgroundColor:
            Platform.OS === "ios"
              ? "transparent"
              : state.dark
              ? dark.colors.page.bg.start
              : light.colors.page.bg.start,
        },
        headerBlurEffect: "prominent",
        headerTintColor: state.dark
          ? dark.colors.tint.text
          : light.colors.tint.text,
      }}
    >
      {children}
    </Stack>
  );
};
