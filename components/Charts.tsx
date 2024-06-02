import React, { useState } from "react";
import styled from "styled-components";
import { Pressable, View } from "react-native";

import { Button } from "@/components/ui/Buttons";

import { HourType } from "@/types/api";
import TempChart from "./charts/TempChart";
import RainChart from "./charts/RainChart";
import UVIndexChart from "./charts/UVIndexChart";
import WindChart from "./charts/WindChart";
import SnowChart from "./charts/SnowChart";

export const Charts = ({ hours }: { hours: HourType[] }) => {
  const [activeChart, setActiveChart] = useState<string>("Temp");

  // find if any of the hours has will_it_rain field set to 1
  const willItRain = hours.some((hour) => hour.will_it_rain === 1);

  // find if any of the hours has will_it_snow field set to 1
  const willItSnow = hours.some((hour) => hour.will_it_snow === 1);

  console.log(hours);

  const charts = [
    { title: "Temp", display: true },
    { title: "Rain", display: willItRain },
    { title: "Snow", display: willItSnow },
    { title: "Wind", display: true },
    { title: "UV Index", display: true },
  ];

  const RenderedChart = () => {
    switch (activeChart) {
      case "Temp":
        return <TempChart hours={hours} />;
      case "Rain":
        return <RainChart hours={hours} />;
      case "Snow":
        return <SnowChart hours={hours} />;
      case "Wind":
        return <WindChart hours={hours} />;
      case "UV Index":
        return <UVIndexChart hours={hours} />;
      default:
        return <TempChart hours={hours} />;
    }
  };

  return (
    <>
      <ButtonContainers>
        {charts.map((chart, index) => {
          if (chart.display) {
            return (
              <Button
                key={index}
                title={chart.title}
                active={activeChart === chart.title}
                onPress={() => {
                  setActiveChart(chart.title);
                }}
              />
            );
          }
        })}
      </ButtonContainers>

      <RenderedChart />
    </>
  );
};

const ButtonContainers = styled(View)`
  display: grid;
  flex-direction: row;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
  padding: 0px 24px;
  gap: 8px;
`;
