import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const CloudIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 24 24">
    <Path
      fill="url(#a)"
      stroke="#1776CD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M16.365 9.5h-.916a6.042 6.042 0 0 0-1.623-2.847 5.76 5.76 0 0 0-2.837-1.53 5.649 5.649 0 0 0-3.192.25 5.832 5.832 0 0 0-2.58 1.955 6.107 6.107 0 0 0-1.187 3.066 6.165 6.165 0 0 0 .565 3.25 5.939 5.939 0 0 0 2.148 2.45c.923.593 1.99.907 3.078.906h6.544a3.58 3.58 0 0 0 2.57-1.098A3.81 3.81 0 0 0 20 13.25a3.81 3.81 0 0 0-1.065-2.652 3.58 3.58 0 0 0-2.57-1.098Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={12}
        x2={12}
        y1={5}
        y2={17}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E1FAFF" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
    </Defs>
  </Svg>
);
