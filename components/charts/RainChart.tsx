import { router } from "expo-router";
import { useContext, useState } from "react";

import { GlobalContext } from "@/context/global";
import { HourType } from "@/types/api";

import { SectionTitle, Text } from "@/components/ui/Typography";

import { dark, global, light } from "@/constants/Theme";

import {
  Left,
  Right,
  HourContainer,
  BarContainer,
  Bar,
  Mask,
  Line,
  ViewBase,
} from "./styles/barChart";

const RainChart = ({ hours }: { hours: HourType[] }) => {
  const { state } = useContext(GlobalContext);

  let highesRain = 7.6;

  // find the max value in the array of hours for the precip_mm however if it is smaller then 7.6mm then set it to 7.6mm
  let maxValue = Math.max(...hours.map((hour) => Math.max(hour.precip_mm)));
  if (maxValue > highesRain) {
    highesRain = maxValue;
  }

  //create a new array from existHours to gether only the hours

  const [barHeight, setBarHeight] = useState(0);

  return (
    <ViewBase>
      <Left>
        <SectionTitle>High</SectionTitle>
        <SectionTitle>Med</SectionTitle>
        <SectionTitle>Low</SectionTitle>
      </Left>
      <Right horizontal showsHorizontalScrollIndicator={false}>
        {hours.map((hour, index) => {
          return (
            <HourContainer
              key={index}
              onPress={() => {
                router.navigate({
                  pathname: "/hourmodal",
                  params: { hour: hour.time_epoch },
                });
              }}
            >
              <BarContainer>
                <Bar
                  onLayout={(event) => {
                    setBarHeight(event.nativeEvent.layout.height);
                  }}
                >
                  <Mask height={(hour.precip_mm * 100) / highesRain}>
                    <Line
                      height={barHeight}
                      start={[0, 0]}
                      end={[0, 1]}
                      colors={
                        state.dark
                          ? [
                              dark.colors.chart.bar.high,
                              dark.colors.chart.bar.medium,
                              dark.colors.chart.bar.low,
                            ]
                          : [
                              light.colors.chart.bar.high,
                              light.colors.chart.bar.medium,
                              light.colors.chart.bar.low,
                            ]
                      }
                    />
                  </Mask>
                </Bar>
              </BarContainer>
              <Text>
                {Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  hour12: true,
                }).format(new Date(hour.time))}
              </Text>
            </HourContainer>
          );
        })}
      </Right>
    </ViewBase>
  );
};

export default RainChart;
