import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const HumidityIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 24 24">
    <Path
      fill="url(#a)"
      stroke="#008294"
      strokeLinecap="round"
      strokeWidth={0.5}
      d="m11.98 3-3.226 7.903a3.5 3.5 0 0 0 6.02 3.448c.759-.99.933-2.31.458-3.464L11.98 3Z"
    />
    <Path
      fill="url(#b)"
      stroke="#008294"
      strokeLinecap="round"
      strokeWidth={0.5}
      d="m18.99 14-1.57 3.59a1.72 1.72 0 1 0 3.152-.009L18.99 14Z"
    />
    <Path
      fill="url(#c)"
      stroke="#008294"
      strokeLinecap="round"
      strokeWidth={0.5}
      d="m4.99 11-1.57 3.59a1.72 1.72 0 1 0 3.152-.009L4.99 11Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={12}
        x2={12}
        y1={3}
        y2={18}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#008294" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={19}
        x2={19}
        y1={14}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#008294" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={5}
        x2={5}
        y1={11}
        y2={18}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#008294" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
    </Defs>
  </Svg>
);
