import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { LineChart } from "react-native-gifted-charts";

import { GlobalContext } from "@/context/global";
import { HourType } from "@/types/api";
import { Card } from "@/ui/Card";
import { Caption, Text } from "@/ui/Typography";
import { View } from "@/ui/Containers";

import { ValueColor } from "@/func/valueColor";

import IconContainer from "@/ui/IconContainer";

const Hours = ({
  hours,
  day,
  today,
  nextdayhours,
}: {
  hours: HourType[];
  today?: boolean;
  day: number;
  nextdayhours?: HourType[];
}) => {
  const { state } = useContext(GlobalContext);
  let existHours = hours.filter((hour) =>
    //check the hour if it is after current hour then display it
    today ? new Date().getHours() <= new Date(hour.time).getHours() : true
  );

  //if today is true then display the next day hours
  if (today) {
    //check the length of existHours if it is less than 24 then add next day hours to make it the existing hours length to 24
    if (existHours.length < 24) {
      existHours = [
        ...existHours,
        ...nextdayhours!.slice(0, 24 - existHours.length),
      ];
    }
  }

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
                    ? `${Math.round(hour.temp_c)} °C`
                    : `${Math.round(hour.temp_f)} °F`}
                </Text>
                <Caption
                  color={ValueColor({ value: hour.feelslike_c, type: "temp" })}
                >
                  {state.settings.tempType === 0
                    ? `${Math.round(hour.feelslike_c)} °C`
                    : `${Math.round(hour.feelslike_f)} °F`}
                </Caption>
              </View>
              <IconContainerSmall>
                <IconContainer
                  size={16}
                  code={hour.condition.code}
                  day={hour.is_day}
                />
              </IconContainerSmall>
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
  last,
}: {
  children: React.ReactNode;
  hour: number;
  day?: number;
  last?: boolean;
}) => {
  return (
    <ClickArea
      key={hour}
      last={last}
      onPress={() => {
        router.navigate({
          pathname: "/hourmodal",
          params: { hour },
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

const IconContainerSmall = styled(View)`
  width: 16px;
  height: 16px;
  align-items: center;
`;
