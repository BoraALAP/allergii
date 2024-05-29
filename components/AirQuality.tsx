import { GoogleAirQualityType, GooglePollenType } from "@/types/api";

import { Text, SectionTitle, Value, Body } from "@/components/ui/Typography";
import React, { useContext } from "react";

import { Card, CardContent, Row } from "@/components/ui/Card";

import { GlobalContext } from "@/context/global";
import styled from "styled-components";
import { View } from "react-native";
import { Grid } from "@/components/ui/Containers";
import { ValueColor } from "@/func/valueColor";
import { DividerH } from "./ui/Elements";
import Pollen from "./PollenInfo";

const AirQuality = ({
  airQuality,
  pollen,
}: {
  airQuality: GoogleAirQualityType;
  pollen: GooglePollenType;
}) => {
  const { state } = useContext(GlobalContext);

  console.log(airQuality);

  if (airQuality.error !== undefined) {
    return (
      <View>
        <Text>There was an error on our side. We are working on the fix.</Text>
      </View>
    );
  }

  const { aqiDisplay, displayName, category, aqi } = airQuality?.indexes[1];
  const polutants = airQuality.pollutants;

  // write a switch function that takes the keys and turns them in to name of the air quality

  return (
    <>
      <Card>
        <Spacing>
          <Row>
            <Circle level={aqi}>
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
                <ItemContainerValues key={item.code}>
                  <SectionTitle>{item.displayName}</SectionTitle>
                  <Value
                    color={ValueColor({
                      value: item.concentration.value,
                      type: item.code,
                    })}
                  >
                    {Math.round(item.concentration.value)}
                  </Value>
                </ItemContainerValues>
              ))}
            </Grid>
          )}
        </Spacing>
      </Card>
      <Pollen pollen={pollen} />
    </>
  );
};

export default AirQuality;

export const ItemContainer = styled(View)<{ row?: boolean }>`
  gap: -8px;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: ${(props) => (props.row ? "space-between" : "flex-start")};
  min-width: 30px;
`;

const ItemContainerValues = styled(ItemContainer)`
  flex: 1;
`;

const Circle = styled(View)<{ level: number }>`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  background-color: ${(props) => {
    if (props.level > 4) {
      return props.theme.colors.level.medium;
    } else if (props.level > 7) {
      return props.theme.colors.level.high;
    } else if (props.level > 10) {
      return props.theme.colors.level.extreme;
    } else {
      return props.theme.colors.level.low;
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
