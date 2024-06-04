import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "react-native";
import { useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "@/context/global";
import { Card, Row } from "@/components/ui/Card";
import { DividerV } from "@/components/ui/Elements";
import { BigNumber, SectionTitle, Value } from "@/components/ui/Typography";
import { ValueColor } from "@/func/valueColor";
import { dark, light } from "@/constants/Theme";
import { SunIcon } from "@/assets/icons/sun";
import { CloudIcon } from "@/assets/icons/cloud";
import { HumidityIcon } from "@/assets/icons/humidity";
import IconContainer from "@/components/ui/IconContainer";

type RealTimeProps = {
  day?: number;
  temp: {
    c: number;
    f: number;
  };
  feelslike?: {
    c: number;
    f: number;
  };
  location?: {
    name: string;
    country?: string;
  };
  cloud?: number;
  condition: {
    code: number;
    text: string;
    icon: string;
  };
  is_day: number;
  humidity: number;
};

const RealTime = ({
  day,
  cloud,
  condition,
  temp,
  feelslike,
  location,
  is_day,
  humidity,
}: RealTimeProps) => {
  const { state } = useContext(GlobalContext);

  return (
    <Card row>
      <IconContainer size={72} code={condition.code} day={is_day} />
      <DividerV />
      <CardContent>
        {day !== undefined && (
          <SectionTitle color="secondary">
            {new Date(day * 1000).setHours(0, 0, 0, 0) ===
            new Date().setHours(0, 0, 0, 0)
              ? "Today"
              : Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  weekday: "long",
                }).format(new Date(day * 1000))}
          </SectionTitle>
        )}
        <Row style={{ gap: 24 }}>
          <Row style={{ gap: 4, alignItems: "flex-start" }}>
            <SectionTitle>{!!day ? "Max" : ""}</SectionTitle>
            <BigNumber color={ValueColor({ value: temp.c, type: "temp" })}>
              {state.settings.tempType === 0
                ? `${Math.round(temp.c)}°C`
                : `${Math.round(temp.f)}°F`}
            </BigNumber>
          </Row>
          {feelslike && (
            <Row style={{ gap: 4, alignItems: "flex-start" }}>
              <SectionTitle>{!!day ? "Min" : "Feels"}</SectionTitle>
              <BigNumber
                color={ValueColor({ value: feelslike.c, type: "temp" })}
              >
                {state.settings.tempType === 0
                  ? `${Math.round(feelslike.c)}°C`
                  : `${Math.round(feelslike.f)}°F`}
              </BigNumber>
            </Row>
          )}
        </Row>
        {location && (
          <SectionTitle color="secondary">
            {location.name} {location.country && `, ${location.country}`}
          </SectionTitle>
        )}
        <Row style={{ gap: 28 }}>
          {cloud !== undefined && (
            <Row style={{ gap: 4 }}>
              <IconContainerSmall>
                <CloudIcon />
              </IconContainerSmall>
              <Value>{cloud}%</Value>
            </Row>
          )}
          <Row style={{ gap: 4 }}>
            <IconContainerSmall>
              <HumidityIcon />
            </IconContainerSmall>

            <Value>{humidity}%</Value>
          </Row>
        </Row>
      </CardContent>
    </Card>
  );
};

export default RealTime;

const IconContainerSmall = styled(View)`
  width: 24px;
  height: 24px;
`;

const CardContent = styled(View)`
  flex: 1;
  padding: 12px 0px;
`;
