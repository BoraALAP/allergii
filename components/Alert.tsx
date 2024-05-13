import { Dimensions, FlatList, View, useColorScheme } from "react-native";

import { AlertType } from "@/types/api";

import { Text } from "@/ui/Typography";

import { useState } from "react";

import styled from "styled-components";
import { AlertIcon } from "@/assets/icons/alert";

const Alert = ({ alerts }: { alerts: AlertType[] }) => {
  const CARD_WIDTH = Dimensions.get("window").width - 82;

  const [activeSlide, setActiveSlide] = useState<number | null>(0);

  return (
    <CardScroll>
      <FlatList
        data={alerts}
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
              <AlertIcon />
            </IconContainer>
            <Text bold>{item.event}</Text>
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
      {/* <Thumbnail /> */}
      {alerts.length > 1 && (
        <Thumbnails>
          {alerts.map((item: any, index: number) => {
            return <Thumbnail key={index} active={index === activeSlide} />;
          })}
        </Thumbnails>
      )}
    </CardScroll>
  );
};

const CardScroll = styled(View)`
  width: 100%;
  padding: 16px;
  gap: 16px;
  border-color: ${(props: any) => props.theme.colors.card.border};
  border-width: 1px;
  background-color: ${(props: any) => props.theme.colors.card.background};
  elevation: 4;
  shadow-color: ${(props: any) => props.theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  border-radius: 8px;
  justify-content: flex-start;
`;

const FlatItem = styled(View)<{ width: number }>`
  gap: 16px;
  flex: 1;
  flex-direction: row;
  width: ${(props: any) => props.width}px;
  align-items: center;
`;

const Thumbnail = styled(View)<{ active?: boolean }>`
  width: 8px;
  height: 4px;
  border-radius: 4px;
  background-color: ${(props: any) =>
    props.active ? props.theme.colors.primary : props.theme.colors.soft};
`;

const Thumbnails = styled(View)`
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

const IconContainer = styled(View)<{ severity: string }>`
  background-color: ${(props: any) => {
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
        return props.theme.colors.level.normal;
    }
  }};
  padding: 8px;
  border-radius: 8px;
  width: 48px;
  height: 48px;
`;

export default Alert;
