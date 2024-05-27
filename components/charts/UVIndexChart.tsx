import { router } from "expo-router";
import { useContext } from "react";
import { Pressable, View as ViewBase } from "react-native";
import styled from "styled-components";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import { LinearGradient, Stop } from "react-native-svg";

import { GlobalContext } from "@/context/global";
import { HourType } from "@/types/api";
import { Text } from "@/components/ui/Typography";

import { dark, light } from "@/constants/Theme";
import { CustomDataPoint } from "./styles/lineChart";

const UVIndexChart = ({ hours }: { hours: HourType[] }) => {
  const { state } = useContext(GlobalContext);

  //find the max and min value from existhours array, after looking uv and feelslike_c, which ever is bigger and smaller
  const maxValue = Math.max(
    ...hours.map((hour) => Math.max(hour.uv, hour.feelslike_c))
  );
  const minValue = Math.min(
    ...hours.map((hour) => Math.min(hour.uv, hour.feelslike_c))
  );

  const DataPointLabelComponent = ({ hour }: any) => {
    return <TextLabel>{hour.uv.toString()}</TextLabel>;
  };

  //create a new array from existHours to gether only the hours
  const tempArray = hours.map((hour, index) => {
    return {
      value: Math.round(hour.uv),
      dataPointLabelShiftX: 20,
      dataPointLabelShiftY: -23,
      index: index,
      pointerShiftX: -15,
      labelComponent: () => {
        return (
          <BottomLabel>
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

  return (
    <LineChart
      data={tempArray}
      isAnimated
      animateTogether
      curved
      areaChart
      hideYAxisText
      focusEnabled
      hideAxesAndRules
      mostNegativeValue={minValue - 2}
      maxValue={maxValue + 2}
      height={136}
      unFocusOnPressOut={false}
      zIndex1={10}
      xAxisLabelsVerticalShift={24}
      onFocus={(data: any) => {
        router.navigate({
          pathname: "/hourmodal",
          params: { hour: hours[data.index].time_epoch },
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
      lineGradientId="lg"
      lineGradientComponent={() => {
        return (
          <LinearGradient id="lg" x1="0" y1="1" x2="0" y2="0">
            <Stop
              offset="0.6"
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

const BottomLabel = styled(ViewBase)`
  justify-content: center;
  align-items: center;
`;

export default UVIndexChart;
