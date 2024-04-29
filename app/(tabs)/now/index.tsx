import { useContext } from "react";
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

const HomePage = () => {
  const { state } = useContext(GlobalContext);
  const { apiDataState } = useContext(ApiDataContext);
  console.log(apiDataState);

  if (state.loading || !apiDataState.current || !apiDataState.location) {
    return <Loading />;
  }

  return (
    <PageScrollView center>
      {/* {apiDataState.alerts.alert.length > 0 && ( */}
      <Alert alerts={apiDataState.alerts.alert} />
      {/* )} */}
      <RealTime
        cloud={apiDataState.current.cloud}
        condition={apiDataState.current.condition}
        uv={apiDataState.current.uv}
        is_day={apiDataState.current.is_day}
        humidity={apiDataState.current.humidity}
        temp={{
          c: apiDataState.current.temp_c,
          f: apiDataState.current.temp_f,
        }}
        feelslike={{
          c: apiDataState.current.feelslike_c,
          f: apiDataState.current.feelslike_f,
        }}
        location={{
          name: apiDataState.location.name,
          country: apiDataState.location.country,
        }}
      />

      <DividerH />
      <WindInfo
        wind_degree={apiDataState.current.wind_degree}
        wind_dir={apiDataState.current.wind_dir}
        wind_kph={apiDataState.current.wind_kph}
        wind_mph={apiDataState.current.wind_mph}
        gust_kph={apiDataState.current.gust_kph}
        gust_mph={apiDataState.current.gust_mph}
        vis_km={apiDataState.current.vis_km}
        vis_miles={apiDataState.current.vis_miles}
        precip_in={apiDataState.current.precip_in}
        precip_mm={apiDataState.current.precip_mm}
      />
      <DividerH />
      {apiDataState.googleairquality !== null && (
        <AirQuality airQuality={apiDataState.googleairquality} />
      )}
      <DividerH />
      <Hours
        today
        hours={apiDataState.forecast.forecastday[0].hour}
        day={apiDataState.forecast.forecastday[0].date_epoch}
      />
      <DividerH />
      <AstroInfo astro={apiDataState.forecast.forecastday[0].astro} />
      <DividerH />
      <DayDetails day={apiDataState.forecast.forecastday[0].day as DayType} />
    </PageScrollView>
  );
};

export default HomePage;
