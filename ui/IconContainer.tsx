import {
  D113,
  D116,
  D119,
  D122,
  D143,
  D176,
  D179,
  D182,
  D185,
  D200,
  D227,
  D230,
  D248,
  D260,
  D263,
  D284,
  D296,
  D305,
  D308,
  D311,
  D317,
  D326,
  D335,
  D338,
  D350,
  D359,
  D365,
  D374,
  D377,
  D389,
  D392,
  D395,
} from "@/assets/icons/weather/day";
import {
  N113,
  N116,
  N119,
  N122,
  N143,
  N176,
  N179,
  N182,
  N185,
  N200,
  N227,
  N230,
  N248,
  N260,
  N263,
  N284,
  N296,
  N305,
  N308,
  N311,
  N317,
  N326,
  N335,
  N338,
  N350,
  N359,
  N365,
  N374,
  N377,
  N389,
  N392,
  N395,
} from "@/assets/icons/weather/night";
import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { useContext } from "react";

import { View } from "react-native";
import styled from "styled-components";

type IconContainerProps = {
  size?: number;
  code: number;
  day: number;
};

const IconContainer = ({ size, code, day }: IconContainerProps) => {
  const { state } = useContext(GlobalContext);

  const color = state.dark ? dark.colors.primary : light.colors.primary;
  const yellow = state.dark
    ? dark.colors.icon.yellow
    : light.colors.icon.yellow;
  const lightBlue = state.dark
    ? dark.colors.icon.lightBlue
    : light.colors.icon.lightBlue;
  const blue = state.dark ? dark.colors.icon.blue : light.colors.icon.blue;
  const darkBlue = state.dark
    ? dark.colors.icon.darkBlue
    : light.colors.icon.darkBlue;

  switch (code) {
    case 1000:
      return (
        <Container size={size}>
          {day ? <D113 color={yellow} /> : <N113 color={blue} />}
        </Container>
      );

    case 1003:
      return (
        <Container size={size}>
          {day ? <D116 color={lightBlue} /> : <N116 color={lightBlue} />}
        </Container>
      );

    case 1006:
      return (
        <Container size={size}>
          {day ? <D119 color={lightBlue} /> : <N119 color={blue} />}
        </Container>
      );

    case 1009:
      return (
        <Container size={size}>
          {day ? <D122 color={blue} /> : <N122 color={blue} />}
        </Container>
      );

    case 1030:
      return (
        <Container size={size}>
          {day ? <D143 color={blue} /> : <N143 color={blue} />}
        </Container>
      );

    case 1063:
      return (
        <Container size={size}>
          {day ? <D176 color={blue} /> : <N176 color={blue} />}
        </Container>
      );

    case 1066:
      return (
        <Container size={size}>
          {day ? <D179 color={blue} /> : <N179 color={blue} />}
        </Container>
      );

    case 1069:
      return (
        <Container size={size}>
          {day ? <D182 color={blue} /> : <N182 color={blue} />}
        </Container>
      );

    case 1072:
      return (
        <Container size={size}>
          {day ? <D185 color={blue} /> : <N185 color={blue} />}
        </Container>
      );

    case 1087:
      return (
        <Container size={size}>
          {day ? <D200 color={darkBlue} /> : <N200 color={darkBlue} />}
        </Container>
      );

    case 1114:
      return (
        <Container size={size}>
          {day ? <D227 color={blue} /> : <N227 color={blue} />}
        </Container>
      );

    case 1117:
      return (
        <Container size={size}>
          {day ? <D230 color={blue} /> : <N230 color={blue} />}
        </Container>
      );

    case 1135:
      return (
        <Container size={size}>
          {day ? <D248 color={blue} /> : <N248 color={blue} />}
        </Container>
      );

    case 1147:
      return (
        <Container size={size}>
          {day ? <D260 color={blue} /> : <N260 color={blue} />}
        </Container>
      );

    case 1150:
      return (
        <Container size={size}>
          {day ? <D263 color={blue} /> : <N263 color={blue} />}
        </Container>
      );

    case 1153:
      return (
        <Container size={size}>
          {day ? <D263 color={blue} /> : <N263 color={blue} />}
        </Container>
      );

    case 1168:
      return (
        <Container size={size}>
          {day ? <D185 color={blue} /> : <N185 color={blue} />}
        </Container>
      );

    case 1171:
      return (
        <Container size={size}>
          {day ? <D284 color={darkBlue} /> : <N284 color={darkBlue} />}
        </Container>
      );

    case 1180:
      return (
        <Container size={size}>
          {day ? <D176 color={blue} /> : <N176 color={blue} />}
        </Container>
      );

    case 1183:
      return (
        <Container size={size}>
          {day ? <D296 color={blue} /> : <N296 color={blue} />}
        </Container>
      );

    case 1186:
      return (
        <Container size={size}>
          {day ? <D185 color={blue} /> : <N185 color={blue} />}
        </Container>
      );

    case 1189:
      return (
        <Container size={size}>
          {day ? <D296 color={blue} /> : <N296 color={blue} />}
        </Container>
      );

    case 1192:
      return (
        <Container size={size}>
          {day ? <D305 color={darkBlue} /> : <N305 color={darkBlue} />}
        </Container>
      );

    case 1195:
      return (
        <Container size={size}>
          {day ? <D308 color={darkBlue} /> : <N308 color={darkBlue} />}
        </Container>
      );

    case 1198:
      return (
        <Container size={size}>
          {day ? <D311 color={blue} /> : <N311 color={blue} />}
        </Container>
      );

    case 1201:
      return (
        <Container size={size}>
          {day ? <D311 color={blue} /> : <N311 color={blue} />}
        </Container>
      );

    case 1204:
      return (
        <Container size={size}>
          {day ? <D317 color={blue} /> : <N317 color={blue} />}
        </Container>
      );

    case 1207:
      return (
        <Container size={size}>
          {day ? <D317 color={blue} /> : <N317 color={blue} />}
        </Container>
      );

    case 1210:
      return (
        <Container size={size}>
          {day ? <D179 color={blue} /> : <N179 color={blue} />}
        </Container>
      );

    case 1213:
      return (
        <Container size={size}>
          {day ? <D326 color={blue} /> : <N326 color={blue} />}
        </Container>
      );

    case 1216:
      return (
        <Container size={size}>
          {day ? <D179 color={blue} /> : <N179 color={blue} />}
        </Container>
      );

    case 1219:
      return (
        <Container size={size}>
          {day ? <D326 color={blue} /> : <N326 color={blue} />}
        </Container>
      );

    case 1222:
      return (
        <Container size={size}>
          {day ? <D335 color={blue} /> : <N335 color={blue} />}
        </Container>
      );

    case 1225:
      return (
        <Container size={size}>
          {day ? <D338 color={darkBlue} /> : <N338 color={darkBlue} />}
        </Container>
      );

    case 1237:
      return (
        <Container size={size}>
          {day ? <D350 color={blue} /> : <N350 color={blue} />}
        </Container>
      );

    case 1240:
      return (
        <Container size={size}>
          {day ? <D176 color={blue} /> : <N176 color={blue} />}
        </Container>
      );

    case 1243:
      return (
        <Container size={size}>
          {day ? <D305 color={blue} /> : <N305 color={blue} />}
        </Container>
      );

    case 1246:
      return (
        <Container size={size}>
          {day ? <D359 color={darkBlue} /> : <N359 color={darkBlue} />}
        </Container>
      );

    case 1249:
      return (
        <Container size={size}>
          {day ? <D182 color={blue} /> : <N182 color={blue} />}
        </Container>
      );

    case 1252:
      return (
        <Container size={size}>
          {day ? <D365 color={blue} /> : <N365 color={blue} />}
        </Container>
      );

    case 1255:
      return (
        <Container size={size}>
          {day ? <D179 color={blue} /> : <N179 color={blue} />}
        </Container>
      );

    case 1258:
      return (
        <Container size={size}>
          {day ? <D335 color={blue} /> : <N335 color={blue} />}
        </Container>
      );

    case 1261:
      return (
        <Container size={size}>
          {day ? <D374 color={blue} /> : <N374 color={blue} />}
        </Container>
      );

    case 1264:
      return (
        <Container size={size}>
          {day ? <D377 color={blue} /> : <N377 color={blue} />}
        </Container>
      );

    case 1273:
      return (
        <Container size={size}>
          {day ? <D200 color={darkBlue} /> : <N200 color={darkBlue} />}
        </Container>
      );

    case 1276:
      return (
        <Container size={size}>
          {day ? <D389 color={darkBlue} /> : <N389 color={darkBlue} />}
        </Container>
      );

    case 1279:
      return (
        <Container size={size}>
          {day ? <D392 color={darkBlue} /> : <N392 color={darkBlue} />}
        </Container>
      );

    case 1282:
      return (
        <Container size={size}>
          {day ? <D395 color={darkBlue} /> : <N395 color={darkBlue} />}
        </Container>
      );
    default:
      break;
  }
};

const Container = styled(View)<{ size?: number }>`
  display: grid;
  width: ${(props) => `${props.size}px` || "24px"};
  height: ${(props) => `${props.size}px` || "24px"};
`;

export default IconContainer;
