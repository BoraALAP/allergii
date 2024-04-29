import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "@/context/global";
import { ItemContainer, View } from "@/ui/Containers";
import { DividerV } from "@/ui/Elements";
import { SectionTitle, Value } from "@/ui/Typography";
import { ValueColor } from "@/func/valueColor";
import { Card } from "@/ui/Card";
import { DayType } from "@/types/api";

type DayDetailsProps = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  avgvis_km: number;
  avgvis_miles: number;
};

const DayDetails = ({ day }: { day: DayType }) => {
  console.log(day);

  const { state } = useContext(GlobalContext);
  const {
    maxtemp_c,
    maxtemp_f,
    maxwind_kph,
    maxwind_mph,
    mintemp_c,
    mintemp_f,
    totalprecip_mm,
    totalprecip_in,
    daily_will_it_rain,
    daily_will_it_snow,
    totalsnow_cm,
    daily_chance_of_rain,
    daily_chance_of_snow,
    avgvis_km,
    avgvis_miles,
  }: DayDetailsProps = day;
  return (
    <Card row>
      <Column center>
        <IconContainer>
          <FontAwesome
            name="exclamation-triangle"
            size={24}
            color={state.dark ? "#ff0" : "#000"}
          />
        </IconContainer>
        <ItemContainer>
          <SectionTitle>Max Temp:</SectionTitle>
          <Value color={ValueColor({ value: maxtemp_c, type: "temp" })}>
            {state.settings.distanceType === 0
              ? `${maxtemp_c}°C`
              : `${maxtemp_f}°F`}
          </Value>
        </ItemContainer>
        <ItemContainer>
          <SectionTitle>Min Temp:</SectionTitle>
          <Value color={ValueColor({ value: mintemp_c, type: "temp" })}>
            {state.settings.distanceType === 0
              ? `${mintemp_c}°C`
              : `${mintemp_f}°F`}
          </Value>
        </ItemContainer>
      </Column>
      <DividerV />
      <Column center>
        <IconContainer>
          <FontAwesome
            name="exclamation-triangle"
            size={24}
            color={state.dark ? "#ff0" : "#000"}
          />
        </IconContainer>
        <ItemContainer>
          <SectionTitle>Max Wind Speed:</SectionTitle>
          <Value color={ValueColor({ value: maxwind_kph, type: "speed" })}>
            {state.settings.distanceType === 0
              ? `${maxwind_kph} KM/H`
              : `${maxwind_mph} M/H`}
          </Value>
        </ItemContainer>
        <ItemContainer>
          <SectionTitle>Avg. Visibility:</SectionTitle>
          <Value color={ValueColor({ value: avgvis_km, type: "visibility" })}>
            {state.settings.distanceType === 0
              ? `${avgvis_km} KM`
              : `${avgvis_miles} M`}
          </Value>
        </ItemContainer>
      </Column>
      {daily_will_it_rain > 0 && (
        <>
          <DividerV />
          <Column center>
            <IconContainer>
              <FontAwesome
                name="exclamation-triangle"
                size={24}
                color={state.dark ? "#ff0" : "#000"}
              />
            </IconContainer>
            <ItemContainer>
              <SectionTitle>Rain Amount:</SectionTitle>
              <Value
                color={ValueColor({ value: totalprecip_mm, type: "rain" })}
              >
                {state.settings.distanceType === 0
                  ? `${totalprecip_mm} MM`
                  : `${totalprecip_in} INC`}
              </Value>
            </ItemContainer>
            <ItemContainer>
              <SectionTitle>Rain Chance:</SectionTitle>
              <Value
                color={ValueColor({
                  value: daily_chance_of_rain,
                  type: "chance",
                })}
              >
                {daily_chance_of_rain} %
              </Value>
            </ItemContainer>
          </Column>
        </>
      )}
      {daily_will_it_snow > 0 && (
        <>
          <DividerV />
          <Column center>
            <IconContainer>
              <FontAwesome
                name="exclamation-triangle"
                size={24}
                color={state.dark ? "#ff0" : "#000"}
              />
            </IconContainer>
            <ItemContainer>
              <SectionTitle>Snow Amount:</SectionTitle>
              <Value color={ValueColor({ value: totalsnow_cm, type: "rain" })}>
                {totalsnow_cm} CM
              </Value>
            </ItemContainer>
            <ItemContainer>
              <SectionTitle>Snow Chance:</SectionTitle>
              <Value
                color={ValueColor({
                  value: daily_chance_of_snow,
                  type: "chance",
                })}
              >
                {daily_chance_of_snow} %
              </Value>
            </ItemContainer>
          </Column>
        </>
      )}
    </Card>
  );
};

export default DayDetails;

const IconContainer = styled(View)`
  margin-bottom: 8px;
`;

const ItemContainerCenter = styled(ItemContainer)`
  align-items: center;
  justify-content: center;
`;

const Column = styled(View)<{ center?: boolean }>`
  flex: 1;
  justify-content: center;
`;
