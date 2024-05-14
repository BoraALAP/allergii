import { useContext, useLayoutEffect } from "react";
import styled from "styled-components";

import { GlobalContext } from "@/context/global";
import { ApiDataContext } from "@/context/apidata";
import { NowAiContext } from "@/context/nowai";

import { PageScrollView } from "@/ui/Containers";

import AirQuality from "@/components/AirQuality";
import WindInfo from "@/components/WindInfo";

import RealTime from "@/components/RealTime";
import Loading from "@/ui/Loading";
import Alert from "@/components/Alert";
import { DividerH } from "@/ui/Elements";
import Hours from "@/components/Hours";
import AstroInfo from "@/components/AstroInfo";
import DayDetails from "@/components/DayDetails";
import { DayType } from "@/types/api";
import RainInfo from "@/components/RainInfo";
import Pollen from "@/components/PollenInfo";

const HomePage = () => {
  const { state } = useContext(GlobalContext);
  const {
    apiDataState: {
      current,
      location,
      alerts,
      forecast,
      googleairquality,
      googlepollen,
    },
  } = useContext(ApiDataContext);

  if (state.loading || !current || !location) {
    return <Loading />;
  }
  const day = forecast.forecastday[0];

  return (
    <PageScrollView center>
      {alerts.alert.length > 0 && <Alert alerts={alerts.alert} />}
      <RealTime
        cloud={current.cloud}
        condition={current.condition}
        is_day={current.is_day}
        humidity={current.humidity}
        temp={{
          c: current.temp_c,
          f: current.temp_f,
        }}
        feelslike={{
          c: current.feelslike_c,
          f: current.feelslike_f,
        }}
        location={{
          name: location.name,
          country: location.country,
        }}
      />

      <DividerH />
      <WindInfo
        wind_degree={current.wind_degree}
        wind_dir={current.wind_dir}
        wind_kph={current.wind_kph}
        wind_mph={current.wind_mph}
        gust_kph={current.gust_kph}
        gust_mph={current.gust_mph}
        vis_km={current.vis_km}
        vis_miles={current.vis_miles}
        precip_in={current.precip_in}
        precip_mm={current.precip_mm}
      />
      <DividerH />
      {googleairquality !== null && (
        <AirQuality airQuality={googleairquality} />
      )}
      <DividerH />
      {state.settings.allergy === 0 && googlepollen !== null && (
        <>
          <Pollen pollen={googlepollen} />
          <DividerH />
        </>
      )}

      <Hours
        today
        hours={day.hour}
        day={day.date_epoch}
        nextdayhours={forecast.forecastday[1].hour}
      />
      <DividerH />
      <DayDetails day={day.day as DayType} />
      {day.day.daily_will_it_rain === 1 && day.day.daily_will_it_snow === 1 && (
        <>
          <DividerH />
          <RainInfo
            chance_of_rain={day.day.daily_chance_of_rain}
            chance_of_snow={day.day.daily_chance_of_snow}
            will_it_rain={day.day.daily_will_it_rain}
            will_it_snow={day.day.daily_will_it_snow}
            precip_in={day.day.totalprecip_in}
            precip_mm={day.day.totalprecip_mm}
            snow_cm={day.day.totalsnow_cm}
          />
        </>
      )}
      <DividerH />
      <AstroInfo astro={day.astro} />
    </PageScrollView>
  );
};

export default HomePage;
