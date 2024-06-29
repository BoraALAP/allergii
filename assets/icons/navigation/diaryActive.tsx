import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
export const DiaryActiveIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={props.color}>
    <Path
      fillRule="evenodd"
      d="M1 3a1 1 0 0 1 1-1h6a5 5 0 0 1 5 5v14a1 1 0 1 1-2 0 2 2 0 0 0-2-2H2a1 1 0 0 1-1-1z"
      clipRule="evenodd"
    />
    <Path
      fillRule="evenodd"
      d="M12.465 3.464A5 5 0 0 1 16 2h6a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-7a2 2 0 0 0-2 2 1 1 0 1 1-2 0V7a5 5 0 0 1 1.464-3.536"
      clipRule="evenodd"
    />
  </Svg>
);
