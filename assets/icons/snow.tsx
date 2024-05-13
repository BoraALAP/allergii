import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const SnowIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 24 24">
    <Path
      fill="url(#a)"
      d="M14 16.5c1.5 0 3.094-.238 5-1 2.5-1 2.105-3.237 1.914-4.174a4.186 4.186 0 0 0-1.423-2.384 4.042 4.042 0 0 0-2.577-.936h-1.031a6.72 6.72 0 0 0-1.442-2.762 6.546 6.546 0 0 0-2.518-1.788 6.429 6.429 0 0 0-5.935.616 6.622 6.622 0 0 0-2.113 2.27 6.79 6.79 0 0 0-.297 6.077c.426.964.922 2.081 2.922 3.081"
    />
    <Circle cx={12} cy={16} r={1} fill="url(#b)" />
    <Circle cx={12} cy={20} r={1} fill="url(#c)" />
    <Circle cx={16} cy={14} r={1} fill="url(#d)" />
    <Circle cx={16} cy={18} r={1} fill="url(#e)" />
    <Circle cx={8} cy={14} r={1} fill="url(#f)" />
    <Circle cx={8} cy={18} r={1} fill="url(#g)" />
    <Defs>
      <LinearGradient
        id="a"
        x1={12.029}
        x2={12.029}
        y1={3}
        y2={16.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#008294" />
        <Stop offset={0.88} stopColor="#fff" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={12}
        x2={12}
        y1={15}
        y2={17}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CFFFFF" />
        <Stop offset={1} stopColor="#75FFFF" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={12}
        x2={12}
        y1={19}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CFFFFF" />
        <Stop offset={1} stopColor="#75FFFF" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={16}
        x2={16}
        y1={13}
        y2={15}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CFFFFF" />
        <Stop offset={1} stopColor="#75FFFF" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={16}
        x2={16}
        y1={17}
        y2={19}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CFFFFF" />
        <Stop offset={1} stopColor="#75FFFF" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={8}
        x2={8}
        y1={13}
        y2={15}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CFFFFF" />
        <Stop offset={1} stopColor="#75FFFF" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={8}
        x2={8}
        y1={17}
        y2={19}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CFFFFF" />
        <Stop offset={1} stopColor="#75FFFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
