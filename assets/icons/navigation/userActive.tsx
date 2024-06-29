import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
export const UserActiveIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={props.color}>
    <Path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10M5 19a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
  </Svg>
);
