import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "react-native";
import { useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "@/context/global";
import { Card, Row } from "@/ui/Card";
import { DividerV } from "@/ui/Elements";
import { BigNumber, SectionTitle, Value } from "@/ui/Typography";
import { ValueColor } from "@/func/valueColor";
import { dark, light } from "@/constants/Theme";

type RealTimeProps = {
  temp: {
    c: number;
    f: number;
  };
  feelslike: {
    c: number;
    f: number;
  };
  location: {
    name: string;
    country: string;
  };
  cloud: number;
  condition: {
    code: number;
    text: string;
    icon: string;
  };
  uv: number;
  is_day: number;
  humidity: number;
};

const RealTime = ({
  cloud,
  condition,
  uv,
  temp,
  feelslike,
  location,
  is_day,
  humidity,
}: RealTimeProps) => {
  const { state } = useContext(GlobalContext);

  //if I use my own icons i can use this function
  // const weather = weatherContidion(code);
  return (
    <Card row>
      <IconContainer>
        <FontAwesome
          name="exclamation-triangle"
          size={56}
          color={state.dark ? dark.colors.primary : light.colors.secondary}
        />
      </IconContainer>
      <DividerV />
      <CardContent>
        <Row style={{ gap: 24 }}>
          <BigNumber color={ValueColor({ value: temp.c, type: "temp" })}>
            {state.settings.tempType === 0 ? `${temp.c}°C` : `${temp.f}°F`}
          </BigNumber>
          <Row style={{ gap: 4, alignItems: "flex-start" }}>
            <SectionTitle>Feels</SectionTitle>
            <BigNumber color={ValueColor({ value: feelslike.c, type: "temp" })}>
              {state.settings.tempType === 0
                ? `${feelslike.c}°C`
                : `${feelslike.f}°F`}
            </BigNumber>
          </Row>
        </Row>
        <SectionTitle color="secondary">
          {location.name}, {location.country}
        </SectionTitle>
        <Row style={{ gap: 28 }}>
          <Row style={{ gap: 4 }}>
            <IconContainerSmall>
              <FontAwesome
                name="map-marker"
                size={24}
                color={
                  state.dark ? dark.colors.primary : light.colors.secondary
                }
              />
            </IconContainerSmall>
            <Value>{cloud}%</Value>
          </Row>
          <Row style={{ gap: 4 }}>
            <IconContainerSmall>
              <FontAwesome
                name="map-marker"
                size={24}
                color={
                  state.dark ? dark.colors.primary : light.colors.secondary
                }
              />
            </IconContainerSmall>

            <Value>{humidity}%</Value>
          </Row>
        </Row>
      </CardContent>
    </Card>
  );
};

export default RealTime;

const IconContainer = styled(View)`
  padding: 8px;
`;
const IconContainerSmall = styled(View)`
  width: 24px;
  height: 24px;
`;

const CardContent = styled(View)`
  flex: 1;
  padding: 12px 0px;
`;
