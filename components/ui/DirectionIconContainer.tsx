import {
  E,
  ENE,
  ESE,
  N,
  NE,
  NNE,
  NNW,
  NW,
  S,
  SE,
  SSE,
  SSW,
  SW,
  W,
  WNW,
  WSW,
} from "@/assets/icons/direction";
import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { useContext } from "react";

import { View } from "react-native";
import styled from "styled-components";

type DirectionIconContainerProps = {
  size?: number;
  direction: string;
  color?: string;
};

export const DirectionIconContainer = ({
  size,
  direction,
  color,
}: DirectionIconContainerProps) => {
  const { state } = useContext(GlobalContext);

  const defaultColor =
    color === undefined
      ? state.dark
        ? dark.colors.primary
        : light.colors.primary
      : color;

  switch (direction) {
    case "N":
      return (
        <Container size={size}>
          <N color={defaultColor} />
        </Container>
      );
    case "NE":
      return (
        <Container size={size}>
          <NE color={defaultColor} />
        </Container>
      );
    case "E":
      return (
        <Container size={size}>
          <E color={defaultColor} />
        </Container>
      );
    case "SE":
      return (
        <Container size={size}>
          <SE color={defaultColor} />
        </Container>
      );
    case "S":
      return (
        <Container size={size}>
          <S color={defaultColor} />
        </Container>
      );
    case "SW":
      return (
        <Container size={size}>
          <SW color={defaultColor} />
        </Container>
      );
    case "W":
      return (
        <Container size={size}>
          <W color={defaultColor} />
        </Container>
      );
    case "NW":
      return (
        <Container size={size}>
          <NW color={defaultColor} />
        </Container>
      );
    case "NNE":
      return (
        <Container size={size}>
          <NNE color={defaultColor} />
        </Container>
      );
    case "ENE":
      return (
        <Container size={size}>
          <ENE color={defaultColor} />
        </Container>
      );
    case "ESE":
      return (
        <Container size={size}>
          <ESE color={defaultColor} />
        </Container>
      );
    case "SSE":
      return (
        <Container size={size}>
          <SSE color={defaultColor} />
        </Container>
      );
    case "SSW":
      return (
        <Container size={size}>
          <SSW color={defaultColor} />
        </Container>
      );
    case "WSW":
      return (
        <Container size={size}>
          <WSW color={defaultColor} />
        </Container>
      );
    case "WNW":
      return (
        <Container size={size}>
          <WNW color={defaultColor} />
        </Container>
      );
    case "NNW":
      return (
        <Container size={size}>
          <NNW color={defaultColor} />
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
