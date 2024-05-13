import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const RainIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 24 24">
    <Path
      fill="url(#a)"
      d="m11.99 7-1.57 3.59a1.72 1.72 0 1 0 3.152-.009L11.99 7Z"
    />
    <Path
      fill="url(#b)"
      d="m12.99 15-1.57 3.59a1.72 1.72 0 1 0 3.152-.009L12.99 15Z"
    />
    <Path
      fill="url(#c)"
      d="M8.99 1 7.42 4.59a1.72 1.72 0 1 0 3.152-.009L8.99 1Z"
    />
    <Path
      fill="url(#d)"
      d="m18.99 14-1.57 3.59a1.72 1.72 0 1 0 3.152-.009L18.99 14Z"
    />
    <Path
      fill="url(#e)"
      d="m16.99 3-1.57 3.59a1.72 1.72 0 1 0 3.152-.009L16.99 3Z"
    />
    <Path
      fill="url(#f)"
      d="m4.99 11-1.57 3.59a1.72 1.72 0 1 0 3.152-.009L4.99 11Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={12}
        x2={12}
        y1={7}
        y2={14}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1776CD" />
        <Stop offset={1} stopColor="#008294" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={13}
        x2={13}
        y1={15}
        y2={22}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1776CD" />
        <Stop offset={1} stopColor="#008294" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={9}
        x2={9}
        y1={1}
        y2={8}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1776CD" />
        <Stop offset={1} stopColor="#008294" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={19}
        x2={19}
        y1={14}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1776CD" />
        <Stop offset={1} stopColor="#008294" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={17}
        x2={17}
        y1={3}
        y2={10}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1776CD" />
        <Stop offset={1} stopColor="#008294" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={5}
        x2={5}
        y1={11}
        y2={18}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1776CD" />
        <Stop offset={1} stopColor="#008294" />
      </LinearGradient>
    </Defs>
  </Svg>
);
