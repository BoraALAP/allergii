import { View } from "react-native";
import styled from "styled-components";

export const Card = styled(View)<{ row?: boolean; noPadding?: boolean }>`
  padding: ${(props) => (props.noPadding ? "0px" : "0 16px")};
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  align-items: center;
  gap: 24px;
`;

export const CardContent = styled(View)`
  display: flex;
`;
export const Row = styled(View)`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;
