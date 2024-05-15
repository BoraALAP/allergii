import { Text as TextBase } from "react-native";
import styled from "styled-components";

export const SectionTitle = styled(TextBase)<{
  color?: "default" | "secondary";
}>`
  font-size: ${(props) => props.theme.font.size.sectionTitle};
  color: ${(props) =>
    props.color === "secondary"
      ? props.theme.colors.secondary
      : props.theme.colors.sectionTitle};
  font-family: ${(props) => props.theme.font.family.primaryBold};
  line-height: 20px;
`;

const Textcolor = styled(TextBase)<{
  color?: "default" | "low" | "high" | "medium" | "extreme" | "normal";
  large?: boolean;
}>`
  color: ${(props) => {
    switch (props.color) {
      case "low":
        return props.theme.colors.level.low;
      case "normal":
        return props.theme.colors.level.normal;
      case "medium":
        return props.theme.colors.level.medium;
      case "high":
        return props.theme.colors.level.high;
      case "extreme":
        return props.theme.colors.level.extreme;
      case "default":
        return props.theme.colors.body;

      default:
        return props.theme.colors.primary;
    }
  }};
`;

export const Value = styled(Textcolor)<{ large?: boolean }>`
  font-size: ${(props) =>
    props.large
      ? props.theme.font.size.largeValue
      : props.theme.font.size.value};

  font-family: ${(props) => props.theme.font.family.primaryBold};
`;

export const BigNumber = styled(Textcolor)`
  font-size: ${(props) => props.theme.font.size.bigNumber};
  font-family: ${(props) => props.theme.font.family.primaryBold};
`;

export const Text = styled(Textcolor)<{ center?: boolean; bold?: boolean }>`
  font-size: ${(props) => props.theme.font.size.base};
  text-align: ${(props) => (props.center ? "center" : "left")};
  flex-wrap: wrap;
  font-family: ${(props) => props.theme.font.family.primaryBold};
`;

export const TextSoft = styled(Textcolor)`
  color: ${(props) => props.theme.colors.body};
`;
export const Caption = styled(Textcolor)`
  font-size: ${(props) => props.theme.font.size.sm};
  font-family: ${(props) => props.theme.font.family.primary};
`;
export const CaptionSoft = styled(Textcolor)`
  color: ${(props) => props.theme.colors.body};
  font-size: ${(props) => props.theme.font.size.sm};
`;

export const Body = styled(Textcolor)`
  color: ${(props) => props.theme.colors.body};
  font-size: ${(props) => props.theme.font.size.base};
  font-family: ${(props) => props.theme.font.family.primary};
`;
