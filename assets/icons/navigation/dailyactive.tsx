import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

export const DailyActiveIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M5 5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM2 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M16 1a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1M8 1a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1M2 10a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </Svg>
);
