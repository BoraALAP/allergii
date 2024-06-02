import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { Text } from "./Typography";
import { CustomDataPoint } from "../charts/styles/lineChart";

type LegendProps = {
  solid: string;
  dotted: string;
};

const Legend = ({ solid, dotted }: LegendProps) => {
  return (
    <Description>
      <Container>
        <Line />
        <View style={{ marginTop: 4 }}>
          <CustomDataPoint />
        </View>
        <Line />
      </Container>
      <Text>{solid}</Text>
      <Container>
        <Line dotted />
        <View style={{ marginTop: 4 }}>
          <CustomDataPoint />
        </View>
        <Line dotted />
      </Container>
      <Text>{dotted}</Text>
    </Description>
  );
};

const Description = styled(View)`
  flex-direction: row;
  gap: 8px;
`;

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  align-content: center;
  gap: 2px;
`;

const Line = styled(View)<{ dotted?: boolean }>`
  border-width: 2px;
  border: 1px ${(props) => (props.dotted ? "dotted" : "solid")}
    ${(props) => props.theme.colors.chart.bottom};
  height: 1px;
  width: 16px;
  border-radius: 5px;
`;

export default Legend;
