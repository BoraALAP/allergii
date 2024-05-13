import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const MoonriseIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 24 24">
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
      stroke="#641BFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 20H3"
    />
    <Path fill="#0083BC" d="M18 18a6 6 0 1 0-12 0" />
    <Path
      fill="#D0E6FF"
      d="m19.5 12 .337 1.037h1.09l-.882.64.337 1.037-.882-.641-.882.64.337-1.036-.882-.64h1.09L19.5 12ZM3.5 12l.337 1.037h1.09l-.882.64.337 1.037-.882-.641-.882.64.337-1.036-.882-.64h1.09L3.5 12ZM8.5 10l.337 1.037h1.09l-.882.64.337 1.037-.882-.641-.882.64.337-1.036-.882-.64h1.09L8.5 10ZM11.5 14l.337 1.037h1.09l-.882.64.337 1.037-.882-.641-.882.64.337-1.036-.882-.64h1.09L11.5 14ZM17.5 16l.337 1.037h1.09l-.882.64.337 1.037-.882-.641-.882.64.337-1.036-.882-.64h1.09L17.5 16Z"
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
        <Stop stopColor="#1B68FF" />
        <Stop offset={1} stopColor="#7F1BFF" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={12}
        x2={12}
        y1={4}
        y2={7}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1B68FF" />
        <Stop offset={1} stopColor="#7F1BFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
