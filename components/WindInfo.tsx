import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "@/context/global";
import { Grid, ItemContainer, View } from "@/ui/Containers";
import { DividerV } from "@/ui/Elements";
import { SectionTitle, Value } from "@/ui/Typography";
import { ValueColor } from "@/func/valueColor";
import { Card } from "@/ui/Card";
import { RainIcon } from "@/assets/icons/rain";

type WindInfoProps = {
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
  gust_kph: number;
  gust_mph: number;
  vis_km: number;
  vis_miles: number;
  precip_in?: number;
  precip_mm?: number;
};

const WindInfo = ({
  wind_degree,
  wind_dir,
  wind_kph,
  wind_mph,
  gust_kph,
  gust_mph,
  vis_km,
  vis_miles,
  precip_in,
  precip_mm,
}: WindInfoProps) => {
  const { state } = useContext(GlobalContext);

  return (
    <Card row>
      <Grid>
        <ItemContainer>
          <SectionTitle>Wind Degree:</SectionTitle>
          <Value>{wind_degree}°</Value>
        </ItemContainer>
        <ItemContainer>
          <SectionTitle>Wind Direction:</SectionTitle>
          <Value>{wind_dir}</Value>
        </ItemContainer>

        <ItemContainer>
          <SectionTitle>Wind Speed:</SectionTitle>
          <Value color={ValueColor({ value: wind_kph, type: "speed" })}>
            {state.settings.distanceType === 0
              ? `${Math.round(wind_kph)} KM/H`
              : `${Math.round(wind_mph)} M/H`}
          </Value>
        </ItemContainer>
        <ItemContainer>
          <SectionTitle>Gust Speed:</SectionTitle>
          <Value color={ValueColor({ value: gust_kph, type: "speed" })}>
            {state.settings.distanceType === 0
              ? `${Math.round(gust_kph)} KM/H`
              : `${Math.round(gust_mph)} M/H`}
          </Value>
        </ItemContainer>
        <ItemContainer>
          <SectionTitle>Visibility:</SectionTitle>
          <Value color={ValueColor({ value: vis_km, type: "visibility" })}>
            {state.settings.distanceType === 0
              ? `${Math.round(vis_km)} KM`
              : `${Math.round(vis_miles)} M`}
          </Value>
        </ItemContainer>
      </Grid>
      {!!precip_mm && precip_mm !== 0 && (
        <>
          <DividerV />
          <View>
            <ItemContainerCenter>
              <IconContainer>
                <RainIcon />
              </IconContainer>
              <SectionTitle>Rain Amount:</SectionTitle>

              <Value
                color={ValueColor({ value: precip_mm, type: "rain" })}
                large
              >
                {state.settings.distanceType === 0
                  ? `${precip_mm} MM`
                  : `${precip_in} INC`}
              </Value>
            </ItemContainerCenter>
          </View>
        </>
      )}
    </Card>
  );
};

export default WindInfo;

const IconContainer = styled(View)`
  margin-bottom: 8px;
  width: 24px;
  height: 24px;
`;

const ItemContainerCenter = styled(ItemContainer)`
  align-items: center;
  justify-content: center;
`;