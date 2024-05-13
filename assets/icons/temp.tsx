import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const TempIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 24 24">
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M9.333 4.236v8.884c0 .866-.237 1.716-.686 2.458l-.278.457a4.245 4.245 0 1 0 7.262 0l-.278-.457a4.742 4.742 0 0 1-.686-2.458V4.236a2.667 2.667 0 1 0-5.334 0ZM12.5 4a.5.5 0 0 0-1 0v14a.5.5 0 0 0 1 0V4Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={12}
        x2={12}
        y1={3}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E10000" />
        <Stop offset={1} stopColor="#07B" />
      </LinearGradient>
    </Defs>
  </Svg>
);
