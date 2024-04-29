import { router } from "expo-router";
import React, { useContext } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { LineChart } from "react-native-gifted-charts";

import { GlobalContext } from "@/context/global";
import { HourType } from "@/types/api";
import { Card } from "@/ui/Card";
import { Caption, Text } from "@/ui/Typography";
import { View } from "@/ui/Containers";
import { LinearGradient, Stop } from "react-native-svg";
import { ValueColor } from "@/func/valueColor";

const Hours = ({
  hours,
  day,
  today,
}: {
  hours: HourType[];
  today?: boolean;
  day: number;
}) => {
  const { state } = useContext(GlobalContext);
  const existHours = hours.filter((hour) =>
    //check the hour if it is after current hour then display it
    today ? new Date().getHours() <= new Date(hour.time).getHours() : true
  );

  const data = [
    { value: 15, time: 18 },
    { value: 30, time: 19 },
    { value: 26, time: 20 },
    { value: 40, time: 21 },
  ];
  const data2 = [
    { value: 25, time: 18 },
    { value: 10, time: 19 },
    { value: 14, time: 20 },
    { value: 46, time: 21 },
  ];

  return (
    <Card noPadding>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment={"start"}
        // pagingEnabled
        // style={{ paddingHorizontal: 16 }}
        contentContainerStyle={{
          gap: 2,
          // paddingHorizontal: 16,
          // paddingVertical: 12,
        }}
      >
        {existHours.map((hour, index) => {
          return (
            <Tile
              key={hour.time_epoch}
              hour={hour.time_epoch}
              day={day}
              today={today}
              last={index === existHours.length - 1}
            >
              <Text>
                {Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                }).format(new Date(hour.time))}
              </Text>
              <View center>
                <Text color={ValueColor({ value: hour.temp_c, type: "temp" })}>
                  {state.settings.tempType === 0
                    ? `${hour.temp_c} °C`
                    : `${hour.temp_f} °F`}
                </Text>
                <Caption
                  color={ValueColor({ value: hour.feelslike_c, type: "temp" })}
                >
                  {state.settings.tempType === 0
                    ? `${hour.feelslike_c} °C`
                    : `${hour.feelslike_f} °F`}
                </Caption>
              </View>
            </Tile>
          );
        })}
        {/* <LineChart
          dataSet={[
            {
              data: data,
            },
            {
              data: data2,
              strokeDashArray: [5, 5],
            },
          ]}
          // hideRules
          spacing={60}
          hideAxesAndRules
          rulesType="dotted"
          xAxisLabelTexts={["18", "19", "20", "21"]}
          rulesLength={4}
          onPress={(value: any) => console.log(value)}
          dashWidth={4}
          dashGap={4}
          curved
          showValuesAsDataPointsText
          isAnimated
          lineGradient
          lineGradientId="ggrd" // same as the id passed in <LinearGradient> below
          lineGradientComponent={() => {
            return (
              <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={"red"} />
                <Stop offset="0.5" stopColor={"orange"} />
                <Stop offset="1" stopColor={"blue"} />
              </LinearGradient>
            );
          }}
        /> */}
      </ScrollView>
    </Card>
  );
};

const Tile = ({
  children,
  hour,
  today,
  day,
  last,
}: {
  children: React.ReactNode;
  hour: number;
  today?: boolean;
  day?: number;
  last?: boolean;
}) => {
  return (
    <ClickArea
      key={hour}
      last={last}
      onPress={() => {
        today
          ? router.push({ pathname: "/(tabs)/today/[hour]/", params: { hour } })
          : router.push({
              pathname: "/(tabs)/forecast/[hour]/hour",
              params: { hour, day: day as number },
            });
      }}
    >
      {children}
    </ClickArea>
  );
};

const ClickArea = styled(TouchableOpacity)<{ last?: boolean }>`
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-right-width: ${(props) => (props.last ? "0px" : "1px")};
  gap: 8px;
  border-color: ${(props) => props.theme.colors.card.border};
`;

export default Hours;
