import { router } from "expo-router";
import { useContext } from "react";
import { LinearGradient, Stop } from "react-native-svg";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

import { GlobalContext } from "@/context/global";
import { HourType } from "@/types/api";
import IconContainer from "@/components/ui/IconContainer";

import { dark, light } from "@/constants/Theme";

import { TextLabel, BottomLabel, CustomDataPoint } from "./styles/lineChart";

const TempChart = ({ hours }: { hours: HourType[] }) => {
  const { state } = useContext(GlobalContext);

  //find the max and min value from existhours array, after looking temp_c and feelslike_c, which ever is bigger and smaller
  const maxValue = Math.max(
    ...hours.map((hour) => Math.max(hour.temp_c, hour.feelslike_c))
  );
  const minValue = Math.min(
    ...hours.map((hour) => Math.min(hour.temp_c, hour.feelslike_c))
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

  //create a new array from existHours to gether only the hours
  const tempArray = hours.map((hour, index) => {
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

  const feelsLikeArray = hours.map((hour, index) => {
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
      animateTogether
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

export default TempChart;
