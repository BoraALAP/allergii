import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  Stop,
  Circle,
  LinearGradient,
  RadialGradient,
} from "react-native-svg";
export const SplashLogo = (props: SvgProps) => (
  <Svg width="160" height="160" viewBox="0 0 1024 1024" fill="none">
    <Path
      fill="#fff"
      d="M453.063 364.665q-2.732-14.367-5.464-34.89-2.05-20.525-2.733-26.681h-2.732q-.683 6.84-3.416 25.997a3095 3095 0 0 1-5.465 35.574L375.873 639h-81.288L201 208h79.239l51.916 265.441q2.732 11.631 4.782 32.154 2.732 20.524 3.415 27.365h2.732l2.733-27.365q2.732-21.207 4.782-32.154L403.197 208h91.535l50.55 265.441q2.732 10.262 5.464 31.47t3.416 28.049h2.049q.683-6.156 2.733-25.997 2.732-20.523 5.464-33.522L617.007 208H686l-92.901 431h-80.606z"
      opacity={0.5}
    />
    <Circle cx={637} cy={644} r={220} fill="url(#a)" />
    <Circle cx={637} cy={644} r={220} fill="url(#b)" fillOpacity={0.2} />
    <Path
      fill="url(#c)"
      d="M447.599 329.775q2.732 20.523 5.464 34.89l18.929 87.378a253.2 253.2 0 0 1 61.75-39.197L494.732 208h-91.535l-52.598 265.441q-2.05 10.947-4.782 32.154l-2.733 27.365h-2.732q-.683-6.841-3.415-27.365-2.05-20.523-4.782-32.154L280.239 208H201l93.585 431h81.288l57.38-274.335a3095 3095 0 0 0 5.465-35.574q2.733-19.157 3.416-25.997h2.732q.683 6.156 2.733 26.681"
    />
    <Path
      fill="url(#d)"
      d="M646.525 391.139a258 258 0 0 0-9.728-.184c-19.721 0-38.915 2.259-57.338 6.531L617.007 208H686z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={530.52}
        x2={762.84}
        y1={460.08}
        y2={826.16}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E6FFFC" />
        <Stop offset={0.619} stopColor="#fff" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={201}
        x2={635.647}
        y1={208}
        y2={684.892}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.285} stopColor="#fff" />
        <Stop offset={1} stopColor="#E6FFFC" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={201}
        x2={635.647}
        y1={208}
        y2={684.892}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.285} stopColor="#fff" />
        <Stop offset={1} stopColor="#E6FFFC" />
      </LinearGradient>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0 220 -220 0 637 644)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CCF4FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </RadialGradient>
    </Defs>
  </Svg>
);
