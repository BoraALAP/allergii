import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View, ScrollView } from "react-native";

import styled from "styled-components";

export const HourContainer = styled(Pressable)`
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Bar = styled(View)`
  background-color: ${(props) => props.theme.colors.chart.bar.bg};
  width: 8px;
  border-radius: 8px;
  flex: 1;
  justify-content: flex-end;
`;

export const BarContainer = styled(View)`
  height: 90%;
  padding: 16px;
`;

export const Mask = styled(View)<{ height: number }>`
  height: ${(props) => props.height}%;
  border-radius: 8px;
  justify-content: flex-end;
  overflow: hidden;
`;

export const Line = styled(LinearGradient)<{ height: number }>`
  border-radius: 8px;
  height: ${(props) => `${props.height}px`};
  position: relative;
`;

export const ViewBase = styled(View)`
  flex-direction: row;
  height: 181px;
  align-items: center;
  margin-top: 16px;
  align-items: flex-start;
`;

export const Left = styled(View)`
  flex-direction: column;
  height: 90%;
  padding: 16px 16px;
  justify-content: space-between;
`;

export const Right = styled(ScrollView)`
  height: 100%;
`;
