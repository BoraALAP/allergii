import { useState } from "react";

type DataProps = {
  humidity: number;
  pm25: number;
  pm10: number;
  temperature: number;
};

export const calculateMoldPotential = (data: DataProps) => {
  const humidity = data.humidity;
  const pm25 = data.pm25;
  const pm10 = data.pm10;
  const temperature = data.temperature;

  let moldIndex = 0;

  // Humidity contribution
  if (humidity > 60) moldIndex += 1;
  if (humidity > 70) moldIndex += 1;
  if (humidity > 80) moldIndex += 1;

  // Particulate matter contribution
  if ((pm25 + pm10) / 2 > 20) moldIndex += 1;
  if ((pm25 + pm10) / 2 > 40) moldIndex += 1;

  // Temperature contribution
  if (temperature > 20) moldIndex += 1;
  if (temperature > 25) moldIndex += 1;

  // Define mold potential based on index

  return {
    value: moldIndex,
    description: moldIndex <= 2 ? "Low" : moldIndex <= 4 ? "Moderate" : "High",
  };
};

export const calculateDustAndDander = (pm25: number, pm10: number) => {
  const combinedPM = (pm25 + pm10) / 2;

  let dustDanderLevel;
  if (combinedPM <= 12) {
    dustDanderLevel = "Low";
  } else if (combinedPM <= 35) {
    dustDanderLevel = "Moderate";
  } else if (combinedPM <= 55) {
    dustDanderLevel = "High";
  } else {
    dustDanderLevel = "Very High";
  }

  return {
    value: combinedPM,
    description: dustDanderLevel,
  };
};
