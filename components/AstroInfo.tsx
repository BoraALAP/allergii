import { MoonriseIcon } from "@/assets/icons/moonrise";
import { MoonsetIcon } from "@/assets/icons/moonset";
import { SunriseIcon } from "@/assets/icons/sunrise";
import { SunsetIcon } from "@/assets/icons/sunset";
import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { AstroType } from "@/types/api";
import { Card, Row } from "@/components/ui/Card";
import { Text, SectionTitle, Value } from "@/components/ui/Typography";

import { useContext } from "react";
import { View } from "react-native";

import styled from "styled-components";

const AstroInfo = ({ astro }: { astro: AstroType }) => {
  const { state } = useContext(GlobalContext);
  return (
    <Card>
      <RowContainer>
        <RowContainer>
          <IconContainer>
            <SunriseIcon />
          </IconContainer>
          <ItemContainer>
            <SectionTitle>Sun Rise:</SectionTitle>
            <Value>{astro.sunrise}</Value>
          </ItemContainer>
        </RowContainer>
        <RowContainer>
          <IconContainer>
            <SunsetIcon />
          </IconContainer>
          <ItemContainer>
            <SectionTitle>Sun Set:</SectionTitle>
            <Value>{astro.sunset}</Value>
          </ItemContainer>
        </RowContainer>
      </RowContainer>
      <RowContainer>
        <RowContainer>
          <IconContainer>
            <MoonriseIcon />
          </IconContainer>
          <ItemContainer>
            <SectionTitle>Moon Rise:</SectionTitle>
            <Value>{astro.moonrise}</Value>
          </ItemContainer>
        </RowContainer>
        <RowContainer>
          <IconContainer>
            <MoonsetIcon />
          </IconContainer>
          <ItemContainer>
            <SectionTitle>Moon Set:</SectionTitle>
            <Value>{astro.moonset}</Value>
          </ItemContainer>
        </RowContainer>
      </RowContainer>
      <RowContainer>
        <ItemContainer>
          <SectionTitle>Moon Phase:</SectionTitle>
          <Value>{astro.moon_phase}</Value>
        </ItemContainer>
        <ItemContainer>
          <SectionTitle>Moon Illumination:</SectionTitle>
          <Value>{astro.moon_illumination} %</Value>
        </ItemContainer>
      </RowContainer>
    </Card>
  );
};

export default AstroInfo;

const IconContainer = styled(View)`
  width: 24px;
  height: 24px;
`;

export const ItemContainer = styled(View)`
  gap: -8px;
  flex-direction: column;
  justify-content: space-between;
  min-width: 80px;
  flex: 1;
`;

export const RowContainer = styled(Row)`
  flex: 1;
`;
