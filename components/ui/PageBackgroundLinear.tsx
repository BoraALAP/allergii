import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren, useContext } from "react";
import { useColorScheme } from "react-native";

import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";

const PageBackgroundLinear = ({ children }: PropsWithChildren) => {
  const { state } = useContext(GlobalContext);

  return (
    <LinearGradient
      colors={[
        state.dark ? dark.colors.page.bg.start : light.colors.page.bg.start,
        state.dark ? dark.colors.page.bg.start : light.colors.page.bg.start,

        state.dark ? dark.colors.page.bg.end : light.colors.page.bg.end,
      ]}
    >
      {children}
    </LinearGradient>
  );
};

export default PageBackgroundLinear;
