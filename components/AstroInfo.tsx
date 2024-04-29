import { dark, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { AstroType } from "@/types/api";
import { Card, CardContent, Row } from "@/ui/Card";
import { Grid, ItemContainer } from "@/ui/Containers";
import { Text, SectionTitle, Value } from "@/ui/Typography";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components";

const AstroInfo = ({ astro }: { astro: AstroType }) => {
  const { state } = useContext(GlobalContext);
  return (
    <Card>
      <Row>
        <Row>
          <IconContainer>
            <FontAwesome
              name="sun-o"
              size={24}
              color={state.dark ? dark.colors.primary : light.colors.secondary}
            />
          </IconContainer>
          <ItemContainer>
            <SectionTitle>Sun Rise:</SectionTitle>
            <Value>{astro.sunrise}</Value>
          </ItemContainer>
        </Row>
        <Row>
          <IconContainer>
            <FontAwesome
              name="sun-o"
              size={24}
              color={state.dark ? dark.colors.primary : light.colors.secondary}
            />
          </IconContainer>
          <ItemContainer>
            <SectionTitle>Sun Set:</SectionTitle>
            <Value>{astro.sunset}</Value>
          </ItemContainer>
        </Row>
      </Row>
      <Row>
        <Row>
          <IconContainer>
            <FontAwesome
              name="sun-o"
              size={24}
              color={state.dark ? dark.colors.primary : light.colors.secondary}
            />
          </IconContainer>
          <ItemContainer>
            <SectionTitle>Moon Rise:</SectionTitle>
            <Value>{astro.moonrise}</Value>
          </ItemContainer>
        </Row>
        <Row>
          <IconContainer>
            <FontAwesome
              name="sun-o"
              size={24}
              color={state.dark ? dark.colors.primary : light.colors.secondary}
            />
          </IconContainer>
          <ItemContainer>
            <SectionTitle>Moon Set:</SectionTitle>
            <Value>{astro.moonset}</Value>
          </ItemContainer>
        </Row>
      </Row>
      <Row>
        <ItemContainer>
          <SectionTitle>Moon Phase:</SectionTitle>
          <Value>{astro.moon_phase}</Value>
        </ItemContainer>
        <ItemContainer>
          <SectionTitle>Moon Illumination:</SectionTitle>
          <Value>{astro.moon_illumination}</Value>
        </ItemContainer>
      </Row>
    </Card>
  );
};

export default AstroInfo;

const IconContainer = styled(View)`
  width: 24px;
  height: 24px;
`;
