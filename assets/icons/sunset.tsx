import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const SunsetIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
    <Path
      stroke="#FFCD1B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 17a4 4 0 1 0-8 0"
    />
    <Path
      stroke="url(#a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10V4"
    />
    <Path
      stroke="#FFCD1B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.5 10.5 7 12M3 17h2M19 17h2M17 12l1.5-1.5"
    />
    <Path
      stroke="#B36000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 20H3"
    />
    <Path
      stroke="url(#b)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15 6-3 4-3-4"
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
        <Stop stopColor="#1B32FF" />
        <Stop offset={1} stopColor="#6D1099" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={12}
        x2={12}
        y1={6}
        y2={10}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1B32FF" />
        <Stop offset={1} stopColor="#6D1099" />
      </LinearGradient>
    </Defs>
  </Svg>
);
