import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
export const UserIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={props.color}>
    <Path
      fillRule="evenodd"
      d="M6.079 15.572C6.792 14.62 7.83 14 9 14h6c1.169 0 2.208.62 2.921 1.572.71.945 1.079 2.18 1.079 3.428v2a1 1 0 1 1-2 0v-2c0-.874-.263-1.674-.679-2.228C15.91 16.222 15.422 16 15 16H9c-.422 0-.91.222-1.321.772C7.263 17.326 7 18.126 7 19v2a1 1 0 1 1-2 0v-2c0-1.247.37-2.483 1.079-3.428M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7"
      clipRule="evenodd"
    />
  </Svg>
);
