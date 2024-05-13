import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const WindIcon = (props: SvgProps) => (
  <Svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
    <Path
      stroke="url(#a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={2}
        x2={21.995}
        y1={12}
        y2={12}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#008294" />
        <Stop offset={1} stopColor="#1776CD" />
      </LinearGradient>
    </Defs>
  </Svg>
);
