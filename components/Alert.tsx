import {
  Dimensions,
  FlatList,
  ScrollView,
  View,
  useColorScheme,
} from "react-native";

import { AlertType } from "@/types/api";

import { Text } from "@/ui/Typography";
import styled from "styled-components";
import { useState } from "react";
import { dark, light } from "@/constants/Theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Card } from "@/ui/Card";

const Alert = ({ alerts }: { alerts: AlertType[] }) => {
  const CARD_WIDTH = Dimensions.get("window").width - 82;

  const [activeSlide, setActiveSlide] = useState<number | null>(0);
  const colorScheme = useColorScheme();

  const dummyAlerts = [
    {
      headline: "Tornado Warning",
      severity: "Extreme",
      event: "Tornado",
    },
    {
      headline: "Hurricane Warning",
      severity: "Severe",
      event: "Tornado",
    },
    {
      headline: "Flood Warning",
      severity: "Moderate",
      event: "Tornado",
    },
    {
      headline: "Thunderstorm Warning",
      severity: "Minor",
      event: "Tornado",
    },
  ];

  return (
    <Card>
      <FlatList
        data={dummyAlerts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.event + index}
        onViewableItemsChanged={(viewableItems) => {
          if (viewableItems.viewableItems[0].isViewable) {
            setActiveSlide(viewableItems.viewableItems[0].index);
          }

          return viewableItems;
        }}
        renderItem={({ item, index }) => (
          <FlatItem key={index} width={CARD_WIDTH}>
            <IconContainer severity={item.severity}>
              <FontAwesome
                name="exclamation-triangle"
                size={16}
                color={
                  colorScheme === "dark"
                    ? dark.colors.invert
                    : light.colors.invert
                }
              />
            </IconContainer>
            <Text bold>{item.headline}</Text>
            {/* <Text>{item.category}</Text> */}
            {/* <Text center>{item.desc}</Text> */}
            {/* <CaptionSoft>
              {Intl.DateTimeFormat("en-US", {
                day: "numeric",
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
              }).format(Date.parse(item.effective))}{" "}
              -{" "}
              {Intl.DateTimeFormat("en-US", {
                day: "numeric",
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
              }).format(Date.parse(item.expires))}
            </CaptionSoft> */}
          </FlatItem>
        )}
      />
      {dummyAlerts.length > 1 && (
        <Thumbnails>
          {alerts.map((item: AlertType, index: number) => {
            return <Thumbnail key={index} active={index === activeSlide} />;
          })}
        </Thumbnails>
      )}
    </Card>
  );
};

export default Alert;

const FlatItem = styled(View)<{ width: number }>`
  gap: 16px;
  flex: 1;
  flex-direction: row;
  margin: 0 16px;
  width: ${(props) => props.width}px;
  align-items: center;
`;

const Thumbnail = styled(View)<{ active: boolean }>`
  width: 8px;
  height: 4px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.soft};
`;

const Thumbnails = styled(View)`
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

const IconContainer = styled(View)<{ severity: string }>`
  background-color: ${(props) => {
    switch (props.severity) {
      case "Extreme":
        return props.theme.colors.level.extreme;
      case "Severe":
        return props.theme.colors.level.high;
      case "Moderate":
        return props.theme.colors.level.medium;
      case "Minor":
        return props.theme.colors.level.normal;

      default:
    }
  }};
  padding: 8px;
  border-radius: 8px;
`;
