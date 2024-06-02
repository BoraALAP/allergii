import { Dimensions, View } from "react-native";
import styled from "styled-components";

export const DiviceWidth = Dimensions.get("window").width;
export const ChartSpace = styled(View)`
  width: ${() => DiviceWidth}px;
  gap: 32px;
  align-items: center;
  justify-content: center;
`;
