import { router } from "expo-router";
import { useContext } from "react";
import {
  Pressable,
  ScrollView,
  TouchableOpacity,
  View as ViewBase,
} from "react-native";
import styled from "styled-components";
import { GlobalContext } from "@/context/global";
import { HourType } from "@/types/api";
import { Card } from "@/ui/Card";
import { Caption, Text } from "@/ui/Typography";
import { View } from "@/ui/Containers";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import { ValueColor } from "@/func/valueColor";

import IconContainer from "@/ui/IconContainer";
// import { LinearGradient  } from "expo-linear-gradient";
import { dark, global, light } from "@/constants/Theme";
import { LinearGradient, Stop } from "react-native-svg";

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

  //find the max and min value from existhours array, after looking temp_c and feelslike_c, which ever is bigger and smaller
  const maxValue = Math.max(
    ...existHours.map((hour) => Math.max(hour.temp_c, hour.feelslike_c))
  );
  const minValue = Math.min(
    ...existHours.map((hour) => Math.min(hour.temp_c, hour.feelslike_c))
  );

  const DataPointLabelComponent = ({ hour, feelLike = false }: any) => {
    return (
      <TextLabel feelLike={feelLike} color={feelLike && "body"}>
        {`${Math.round(
          feelLike
            ? state.settings.tempType === 0
              ? hour.feelslike_c
              : hour.feelslike_f
            : state.settings.tempType === 0
            ? hour.temp_c
            : hour.temp_f
        ).toString()}°`}
      </TextLabel>
    );
  };

  const CustomDataPoint = ({ feelLike }: any) => {
    return (
      <Dot feelLike={feelLike}>
        <InnerDot feelLike={feelLike} />
      </Dot>
    );
  };

  //create a new array from existHours to gether only the hours
  const tempArray = existHours.map((hour, index) => {
    return {
      value: Math.round(hour.temp_c),
      dataPointLabelShiftX: 17,
      dataPointLabelShiftY: hour.temp_c >= hour.feelslike_c ? -20 : 15,
      index: index,
      pointerShiftX: -15,
      labelComponent: () => {
        return (
          <BottomLabel>
            <IconContainer
              size={16}
              code={hour.condition.code}
              day={hour.is_day}
            />
            <TextLabel>
              {Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              }).format(new Date(hour.time))}
            </TextLabel>
          </BottomLabel>
        );
      },
      dataPointLabelComponent: () => {
        return <DataPointLabelComponent hour={hour} />;
      },
    } as lineDataItem;
  });

  const feelsLikeArray = existHours.map((hour, index) => {
    return {
      value: Math.round(hour.feelslike_c),
      dataPointLabelShiftX: 18,
      dataPointLabelShiftY: hour.temp_c >= hour.feelslike_c ? 15 : -20,
      index: index,
      dataPointLabelComponent: () => {
        return <DataPointLabelComponent hour={hour} feelLike />;
      },
    } as lineDataItem;
  });

  return (
    <LineChart
      data={tempArray}
      data2={feelsLikeArray}
      isAnimated
      curved
      areaChart
      hideYAxisText
      focusEnabled
      hideAxesAndRules
      mostNegativeValue={minValue - 2}
      maxValue={maxValue + 2}
      height={300}
      unFocusOnPressOut={false}
      zIndex1={10}
      xAxisLabelsVerticalShift={24}
      onFocus={(data: any) => {
        router.navigate({
          pathname: "/hourmodal",
          params: { hour: existHours[data.index].time_epoch },
        });
      }}
      customDataPoint={() => {
        return <CustomDataPoint />;
      }}
      animateOnDataChange
      animationDuration={1000}
      onDataChangeAnimationDuration={300}
      lineGradient
      lineGradientDirection="vertical"
      lineGradientStartColor={
        state.dark ? dark.colors.level.low : light.colors.level.low
      }
      lineGradientEndColor={
        state.dark ? dark.colors.level.extreme : light.colors.level.extreme
      }
      lineGradientId="lg"
      lineGradientComponent={() => {
        return (
          <LinearGradient id="lg" x1="0" y1="1" x2="0" y2="0">
            <Stop
              offset="0.4"
              stopColor={
                state.dark
                  ? dark.colors.chart.bottom
                  : light.colors.chart.bottom
              }
              stopOpacity={1}
            />
            <Stop
              offset="0.9"
              stopColor={
                state.dark
                  ? dark.colors.chart.middle
                  : light.colors.chart.middle
              }
              stopOpacity={1}
            />
            <Stop
              offset="1.5"
              stopColor={
                state.dark ? dark.colors.chart.top : light.colors.chart.top
              }
              stopOpacity={1}
            />
          </LinearGradient>
        );
      }}
      thickness1={2}
      thickness2={1}
      strokeDashArray2={[5, 5]}
      areaGradientId="ag" // same as the id passed in <LinearGradient> below
      areaGradientComponent={() => {
        return (
          <LinearGradient id="ag" x1="0" y1="1" x2="0" y2="0">
            <Stop
              offset="0.6"
              stopColor={
                state.dark
                  ? dark.colors.chart.bottom
                  : light.colors.chart.bottom
              }
              stopOpacity={0}
            />
            <Stop
              offset="0.9"
              stopColor={
                state.dark
                  ? dark.colors.chart.middle
                  : light.colors.chart.middle
              }
              stopOpacity={0.1}
            />
            <Stop
              offset="1.5"
              stopColor={
                state.dark ? dark.colors.chart.top : light.colors.chart.top
              }
              stopOpacity={0.1}
            />
          </LinearGradient>
        );
      }}
    />
  );
};

const TextLabel = styled(Text)<{ feelLike?: boolean }>`
  font-family: ${(props) => props.theme.font.family.primaryBold};
  font-size: ${(props) =>
    props.feelLike ? props.theme.font.size.sm : props.theme.font.size.base};
`;

const Dot = styled(Pressable)<{ feelLike?: boolean }>`
  width: 8px;
  height: 8px;
  padding: 2px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.invert};
  margin-top: -4px;
`;
const InnerDot = styled(ViewBase)<{ feelLike?: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const BottomLabel = styled(ViewBase)`
  justify-content: center;
  align-items: center;
`;

export default Hours;
