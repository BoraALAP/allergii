import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
export const ChevronRight = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={props.color}>
    <Path d="M8.23 4.234a.777.777 0 0 1 1.113 0l5.966 6.069a2.43 2.43 0 0 1 0 3.394l-5.966 6.069a.777.777 0 0 1-1.113 0 .81.81 0 0 1 0-1.132l5.967-6.068a.81.81 0 0 0 0-1.132L8.23 5.366a.81.81 0 0 1 0-1.132" />
  </Svg>
);
