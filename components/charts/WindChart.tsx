import { router } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { GlobalContext } from "@/context/global";
import { HourType } from "@/types/api";
import { Text } from "@/components/ui/Typography";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

import { dark, light } from "@/constants/Theme";
import { LinearGradient, Stop } from "react-native-svg";
import { DirectionIconContainer } from "../ui/DirectionIconContainer";
import { CustomDataPoint } from "./styles/lineChart";
import Legend from "../ui/Legend";
import { ChartSpace } from "./styles/generalStyle";

const WindChart = ({ hours }: { hours: HourType[] }) => {
  const { state } = useContext(GlobalContext);

  //find the max and min value from existhours array, after looking wind_kph and gust_kph, which ever is bigger and smaller
  const maxValue = Math.max(
    ...hours.map((hour) => Math.max(hour.wind_kph, hour.gust_kph))
  );
  const minValue = Math.min(
    ...hours.map((hour) => Math.min(hour.wind_kph, hour.gust_kph))
  );

  const DataPointLabelComponent = ({ hour, gust = false }: any) => {
    return (
      <TextLabel gust={gust} color={gust && "body"}>
        {`${Math.round(
          gust
            ? state.settings.distanceType === 0
              ? hour.gust_kph
              : hour.gust_mph
            : state.settings.distanceType === 0
            ? hour.wind_kph
            : hour.wind_mph
        ).toString()}`}
      </TextLabel>
    );
  };

  //create a new array from existHours to gether only the hours
  const windArray = hours.map((hour, index) => {
    return {
      value: Math.round(hour.wind_kph),
      dataPointLabelShiftX: 17,
      dataPointLabelShiftY: hour.wind_kph >= hour.gust_kph ? -20 : 15,
      index: index,
      pointerShiftX: -15,
      labelComponent: () => {
        return (
          <BottomLabel>
            <DirectionIconContainer size={16} direction={hour.wind_dir} />
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

  const gustArray = hours.map((hour, index) => {
    return {
      value: Math.round(hour.gust_kph),
      dataPointLabelShiftX: 18,
      dataPointLabelShiftY: hour.wind_kph >= hour.gust_kph ? 15 : -20,
      index: index,
      dataPointLabelComponent: () => {
        return <DataPointLabelComponent hour={hour} gust />;
      },
    } as lineDataItem;
  });

  return (
    <ChartSpace>
      <LineChart
        data={windArray}
        data2={gustArray}
        isAnimated
        animateTogether
        curved
        areaChart
        hideYAxisText
        focusEnabled
        hideAxesAndRules
        mostNegativeValue={minValue - minValue / 5}
        maxValue={maxValue + maxValue / 5}
        height={140}
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
      <Legend solid="Wind" dotted="Gust" />
    </ChartSpace>
  );
};

const TextLabel = styled(Text)<{ gust?: boolean }>`
  font-family: ${(props) => props.theme.font.family.primaryBold};
  font-size: ${(props) =>
    props.gust ? props.theme.font.size.sm : props.theme.font.size.base};
`;

const BottomLabel = styled(View)`
  justify-content: center;
  align-items: center;
`;

export default WindChart;
