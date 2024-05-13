import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const SunriseIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
    <Path
      stroke="url(#a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v6"
    />
    <Path
      stroke="url(#b)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 7 3-3 3 3"
    />
    <Path
      stroke="#FFCD1B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 17a4 4 0 1 0-8 0M5.5 10.625l1.5 1.5M3 17.125h2M19 17.125h2M17 12.125l1.5-1.5"
    />
    <Path
      stroke="#B36000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 20H3"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={12.5}
        x2={12.5}
        y1={4}
        y2={10}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF961B" />
        <Stop offset={1} stopColor="#FFCD1B" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={12}
        x2={12}
        y1={4}
        y2={7}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF961B" />
        <Stop offset={1} stopColor="#FFCD1B" />
      </LinearGradient>
    </Defs>
  </Svg>
);
