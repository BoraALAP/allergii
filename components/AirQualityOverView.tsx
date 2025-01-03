import { GoogleAirQualityType, GooglePollenType } from "@/types/api";

import { SectionTitle, Value, Body } from "@/components/ui/Typography";
import React, { useContext } from "react";

import { Card } from "@/components/ui/Card";

import { GlobalContext } from "@/context/global";
import styled from "styled-components";
import { View } from "react-native";
import { Grid } from "@/components/ui/Containers";
import { ValueColor } from "@/func/valueColor";
import {
  calculateDustAndDander,
  calculateMoldPotential,
} from "@/func/allergyCalculations";

const AirQualityOverView = ({
  airQuality,
  pollen,
  temperature,
  humidity,
}: {
  airQuality: GoogleAirQualityType;
  pollen: GooglePollenType;
  temperature: number;
  humidity: number;
}) => {
  const { state } = useContext(GlobalContext);

  // write a switch function that takes the keys and turns them in to name of the air quality

  if (airQuality.error || pollen.error) {
    return (
      <Card>
        <Body>
          We apologize, but we currently do not have allergy information
          available for this location.
        </Body>
      </Card>
    );
  }

  const { aqiDisplay, displayName, category, aqi } = airQuality?.indexes[1];

  const pm10 = airQuality.pollutants.find((item: any) => item.code === "pm10");
  const pm25 = airQuality.pollutants.find((item: any) => item.code === "pm25");

  const mold = calculateMoldPotential({
    temperature,
    humidity,
    pm10: pm10?.concentration.value || 0,
    pm25: pm25?.concentration.value || 0,
  });
  const dustanddander = calculateDustAndDander(
    pm25?.concentration.value || 0,
    pm10?.concentration.value || 0
  );

  const allergyList = [
    {
      displayName: "Air Quality",
      description: category,
      value: aqi,
    },
    {
      displayName: "Mold",
      description: mold.description,
      value: mold.value,
    },

    {
      displayName: "Dust & Dander",
      description: dustanddander.description,
      value: dustanddander.value,
    },
  ];

  return (
    <Card>
      <Grid>
        <></>
        {allergyList.map((item, index) => (
          <ItemContainer key={index}>
            <Row>
              <SectionTitle>{item.displayName}</SectionTitle>
            </Row>
            {item.value && item.description && (
              <Value
                color={ValueColor({
                  value: item.value,
                  type: "pollen",
                })}
              >
                {item.description}
              </Value>
            )}
          </ItemContainer>
        ))}
        {pollen?.dailyInfo[0].pollenTypeInfo.map((item, index) => (
          <ItemContainer key={index} disabled={!item.inSeason}>
            <Row>
              <SectionTitle>{item.displayName}</SectionTitle>
            </Row>
            {item.indexInfo && (
              <Value
                color={ValueColor({
                  value: item.indexInfo.value,
                  type: "pollen",
                })}
              >
                {item.indexInfo.category}
              </Value>
            )}
          </ItemContainer>
        ))}
      </Grid>

      <Body>{airQuality.healthRecommendations.generalPopulation}</Body>
    </Card>
  );
};

const ItemContainer = styled(View)<{ disabled?: boolean }>`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.card.border};
  gap: -8px;
  flex: 1;
  flex-shrink: 0;
  flex-basis: auto;
  align-self: stretch;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.card.disabled.background
      : props.theme.colors.card.background};
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 0px;
`;

export default AirQualityOverView;
