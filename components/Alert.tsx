import styled from "styled-components";
import { useState } from "react";
import { Dimensions, FlatList, View } from "react-native";

import { AlertType } from "@/types/api";

import { SectionTitle, Text } from "@/components/ui/Typography";

import { AlertIcon } from "@/assets/icons/alert";

const Alert = ({ alerts }: { alerts: AlertType[] }) => {
  const CARD_WIDTH = Dimensions.get("window").width - 50;

  const [activeSlide, setActiveSlide] = useState<number | null>(0);

  return (
    <Container>
      <FlatListContainer
        data={alerts}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any, index) => item.event + index}
        onViewableItemsChanged={(viewableItems) => {
          if (viewableItems.viewableItems[0].isViewable) {
            setActiveSlide(viewableItems.viewableItems[0].index);
          }
        }}
        renderItem={({ item, index }: any) => (
          <CardScroll key={index} width={CARD_WIDTH}>
            <IconContainer severity={item.severity}>
              <AlertIcon />
            </IconContainer>
            <Content>
              <SectionTitle>{item.category}</SectionTitle>
              <Description bold>{item.desc.split(".")[0]}</Description>
            </Content>
          </CardScroll>
        )}
      />

      {alerts.length > 1 && (
        <Thumbnails>
          {alerts.map((item: any, index: number) => {
            return <Thumbnail key={index} active={index === activeSlide} />;
          })}
        </Thumbnails>
      )}
    </Container>
  );
};

const Container = styled(View)`
  padding: 0px 16px;
`;

const Description = styled(Text)``;

const FlatListContainer = styled(FlatList)`
  /* padding: 0px 16px; */
  overflow: visible;
`;

const CardScroll = styled(View)<{ width: number }>`
  padding: 12px 16px;
  width: ${(props: any) => props.width}px;
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
  flex-direction: row;
  margin: 0px 8px;
`;

const Content = styled(View)`
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const Thumbnail = styled(View)<{ active?: boolean }>`
  width: ${(props: any) => (props.active ? "12px" : "8px")};
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
