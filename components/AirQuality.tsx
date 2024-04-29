import { GoogleAirQualityType } from "@/types/api";

import { Text, SectionTitle, Value, Body } from "@/ui/Typography";
import React, { useContext } from "react";

import { Card, CardContent, Row } from "@/ui/Card";

import { GlobalContext } from "@/context/global";
import styled from "styled-components";
import { View } from "react-native";
import { Grid, ItemContainer } from "@/ui/Containers";
import { ValueColor } from "@/func/valueColor";

const AirQuality = ({ airQuality }: { airQuality: GoogleAirQualityType }) => {
  const { state } = useContext(GlobalContext);
  const { aqiDisplay, displayName, category } = airQuality.indexes[1];
  const polutants = airQuality.pollutants;

  // write a switch function that takes the keys and turns them in to name of the air quality

  return (
    <Card>
      <Spacing>
        <Row>
          <Circle level="high">
            <Number>{aqiDisplay}</Number>
          </Circle>
          <ItemContainer>
            <SectionTitle>{displayName}</SectionTitle>
            <Value>{category}</Value>
          </ItemContainer>
        </Row>
        <CardContent>
          <Body>{airQuality.healthRecommendations.generalPopulation}</Body>
        </CardContent>
        {state.settings.allergy === 0 && (
          <Grid>
            {polutants.map((item) => (
              <ItemContainer key={item.code}>
                <SectionTitle>{item.displayName}</SectionTitle>
                <Value
                  color={ValueColor({
                    value: item.concentration.value,
                    type: item.code,
                  })}
                >
                  {item.concentration.value}
                </Value>
              </ItemContainer>
            ))}
          </Grid>
        )}
      </Spacing>
    </Card>
  );
};

export default AirQuality;

const Circle = styled(View)<{ level: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  background-color: ${(props) => {
    switch (props.level) {
      case "low":
        return props.theme.colors.level.low;
      case "high":
        return props.theme.colors.level.high;
      case "medium":
        return props.theme.colors.level.medium;
      case "extreme":
        return props.theme.colors.level.extreme;
      case "normal":
        return props.theme.colors.level.normal;
      default:
        return props.theme.colors.primary;
    }
  }};
  justify-content: center;
  align-items: center;
`;

const Number = styled(Text)`
  color: ${(props) => props.theme.colors.primary};
  font-size: 24px;
  font-family: ${(props) => props.theme.font.family.primaryBold};
`;

const Spacing = styled(View)`
  gap: 8px;
  width: 100%;
`;
