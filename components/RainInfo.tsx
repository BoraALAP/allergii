import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "@/context/global";
import { ItemContainer, View } from "@/components/ui/Containers";
import { DividerV } from "@/components/ui/Elements";
import { SectionTitle, Value } from "@/components/ui/Typography";
import { ValueColor } from "@/func/valueColor";
import { Card } from "@/components/ui/Card";
import { DayType } from "@/types/api";
import { RainIcon } from "@/assets/icons/rain";
import { SnowIcon } from "@/assets/icons/snow";

type RainInfoProps = {
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  will_it_rain: number;
  will_it_snow: number;
  chance_of_rain: number;
  chance_of_snow: number;
};

const RainInfo = ({
  precip_mm,
  precip_in,
  will_it_rain,
  will_it_snow,
  snow_cm,
  chance_of_rain,
  chance_of_snow,
}: RainInfoProps) => {
  const { state } = useContext(GlobalContext);

  return (
    <Card row>
      {will_it_rain > 0 && (
        <>
          <Column center>
            <IconContainer>
              <RainIcon />
            </IconContainer>
            <ItemContainer row>
              <SectionTitle>Rain Amount:</SectionTitle>
              <Value color={ValueColor({ value: precip_mm, type: "rain" })}>
                {state.settings.distanceType === 0
                  ? `${precip_mm} MM`
                  : `${precip_in} INC`}
              </Value>
            </ItemContainer>
            <ItemContainer row>
              <SectionTitle>Rain Chance:</SectionTitle>
              <Value
                color={ValueColor({
                  value: chance_of_rain,
                  type: "chance",
                })}
              >
                {chance_of_rain} %
              </Value>
            </ItemContainer>
          </Column>
        </>
      )}
      {will_it_snow > 0 && (
        <>
          <DividerV />
          <Column center>
            <IconContainer>
              <SnowIcon />
            </IconContainer>
            <ItemContainer row>
              <SectionTitle>Snow Amount:</SectionTitle>
              <Value color={ValueColor({ value: snow_cm, type: "rain" })}>
                {snow_cm} CM
              </Value>
            </ItemContainer>
            <ItemContainer row>
              <SectionTitle>Snow Chance:</SectionTitle>
              <Value
                color={ValueColor({
                  value: chance_of_snow,
                  type: "chance",
                })}
              >
                {chance_of_snow} %
              </Value>
            </ItemContainer>
          </Column>
        </>
      )}
    </Card>
  );
};

export default RainInfo;

const IconContainer = styled(View)`
  margin-bottom: 8px;
  width: 24px;
  height: 24px;
`;

const Column = styled(View)<{ center?: boolean }>`
  flex: 1;
  justify-content: center;
`;
