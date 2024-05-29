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

const AirQualityOverView = ({
  airQuality,
  pollen,
}: {
  airQuality: GoogleAirQualityType;
  pollen: GooglePollenType;
}) => {
  const { state } = useContext(GlobalContext);

  console.log(airQuality);

  const { aqiDisplay, displayName, category, aqi } = airQuality?.indexes[1];

  // write a switch function that takes the keys and turns them in to name of the air quality

  return (
    <Card>
      <Grid>
        <ItemContainer>
          <SectionTitle>Air Quality</SectionTitle>
          <Value>{category}</Value>
        </ItemContainer>
        {pollen.dailyInfo[0].pollenTypeInfo.map((item, index) => (
          <ItemContainer key={index}>
            {item.indexInfo ? (
              <>
                <SectionTitle>{item.displayName}</SectionTitle>
                <Value
                  color={ValueColor({
                    value: item.indexInfo.value,
                    type: "pollen",
                  })}
                >
                  {item.indexInfo.category}
                </Value>
              </>
            ) : (
              <Row>
                <Dot />
                <SectionTitle>{item.displayName}</SectionTitle>
              </Row>
            )}
          </ItemContainer>
        ))}
      </Grid>

      <Body>{airQuality.healthRecommendations.generalPopulation}</Body>
    </Card>
  );
};

export const ItemContainer = styled(View)`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.card.border};
  gap: -8px;
  flex: 1;
  flex-shrink: 0;
  flex-basis: auto;
  align-self: stretch;
`;

export const Dot = styled(View)`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.inSeason.false};
  margin-right: 8px;
`;

export default AirQualityOverView;
