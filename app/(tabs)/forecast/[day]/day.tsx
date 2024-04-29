import React, { useContext } from "react";
import { Link, useLocalSearchParams } from "expo-router";

import TempInfo from "@/components/day/TempInfo";
import RainInfo from "@/components/day/RainInfo";
import SnowInfo from "@/components/day/SnowInfo";
import AirQuality from "@/components/AirQuality";
import WindInfo from "@/components/day/WindInfo";
import RealTime from "@/components/day/RealTime";
import Hours from "@/components/Hours";

import AstroInfo from "@/components/AstroInfo";
import { ApiDataContext } from "@/context/apidata";
import { PageScrollView } from "@/ui/Containers";
import Loading from "@/ui/Loading";

const Day = () => {
  const { day } = useLocalSearchParams();
  const { apiDataState } = useContext(ApiDataContext);

  //find the day in array
  const data = apiDataState.forecast.forecastday.find((item) => {
    return item.date_epoch === parseInt(day as string);
  });

  if (!data) {
    return <Loading />;
  }

  return (
    <PageScrollView center>
      <RealTime
        condition={data.day.condition}
        avghumidity={data.day.avghumidity}
        uv={data.day.uv}
      />
      <Hours hours={data.hour} day={data.date_epoch} />
      <TempInfo
        avgtemp_c={data.day.avgtemp_c}
        avgtemp_f={data.day.avgtemp_f}
        maxtemp_c={data.day.maxtemp_c}
        maxtemp_f={data.day.maxtemp_f}
        mintemp_c={data.day.mintemp_c}
        mintemp_f={data.day.mintemp_f}
      />
      {!!data.day.daily_will_it_rain && (
        <RainInfo
          totalprecip_in={data.day.totalprecip_in}
          totalprecip_mm={data.day.totalprecip_mm}
          daily_chance_of_rain={data.day.daily_chance_of_rain}
        />
      )}
      {!!data.day.daily_will_it_snow && (
        <SnowInfo
          daily_chance_of_snow={data.day.daily_chance_of_snow}
          totalsnow_cm={data.day.totalsnow_cm}
        />
      )}
      <WindInfo
        maxwind_kph={data.day.maxwind_kph}
        maxwind_mph={data.day.maxwind_mph}
        avgvis_km={data.day.avgvis_km}
        avgvis_miles={data.day.avgvis_miles}
      />
      <AstroInfo astro={data.astro} />
      {/* next 3 days only diplayed */}
      {data.day.air_quality && <AirQuality airQuality={data.day.air_quality} />}
    </PageScrollView>
  );
};

export default Day;
