import { View } from "react-native";
import styled from "styled-components";

export const DividerV = styled(View)`
  width: 1px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.divider};
`;
export const DividerH = styled(View)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.divider};
`;
