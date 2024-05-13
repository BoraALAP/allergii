import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
export const AlertIcon = (props: SvgProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <Svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
      <Path
        stroke={state.dark ? dark.colors.invert : light.colors.invert}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9.72v3.093m0 3.093h.008M10.69 5.746 4.205 16.68a1.56 1.56 0 0 0 .55 2.106c.23.137.492.211.76.214h12.97a1.5 1.5 0 0 0 .76-.214 1.558 1.558 0 0 0 .55-2.107L13.309 5.746a1.52 1.52 0 0 0-2.619 0"
      />
    </Svg>
  );
};
