import { dark, light } from "@/constants/Theme";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
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
        },
        headerTransparent: true,
        // headerBlurEffect: "prominent",
        headerTintColor: state.dark
          ? dark.colors.tint.text
          : light.colors.tint.text,
      }}
    >
      {children}
    </Stack>
  );
};
