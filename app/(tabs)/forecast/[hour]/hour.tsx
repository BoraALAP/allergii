import RealTime from "@/components/RealTime";

import WindInfo from "@/components/WindInfo";
import RainInfo from "@/components/day/RainInfo";
import SnowInfo from "@/components/day/SnowInfo";
import { ApiDataContext } from "@/context/apidata";
import { GlobalContext } from "@/context/global";
import { PageScrollView, PageView } from "@/ui/Containers";
import Loading from "@/ui/Loading";
import { Text, SectionTitle } from "@/ui/Typography";

import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";

const Hour = () => {
  const { hour, day } = useLocalSearchParams();
  const { apiDataState } = useContext(ApiDataContext);
  const { state } = useContext(GlobalContext);

  const data = apiDataState.forecast.forecastday.find((dayItem) => {
    return dayItem.date_epoch === parseInt(day as string);
  });
  const hourData = data?.hour.find((hourItem) => {
    return hourItem.time_epoch === parseInt(hour as string);
  });

  if (!data || !hourData) {
    return <Loading />;
  }

  return (
    <PageScrollView center>
      <Text>
        {Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(hourData.time))}
      </Text>
      <SectionTitle>
        {state.settings.tempType === 0
          ? `${hourData.temp_c} °C`
          : `${hourData.temp_f} °F`}
      </SectionTitle>

      <RealTime
        condition={hourData.condition}
        uv={hourData.uv}
        humidity={hourData.humidity}
        is_day={hourData.is_day}
        cloud={hourData.cloud}
      />

      <WindInfo
        wind_kph={hourData.wind_kph}
        wind_mph={hourData.wind_mph}
        wind_degree={hourData.wind_degree}
        wind_dir={hourData.wind_dir}
        gust_kph={hourData.gust_kph}
        gust_mph={hourData.gust_mph}
        vis_km={hourData.vis_km}
        vis_miles={hourData.vis_miles}
      />
      <TempInfo
        feelslike_c={hourData.feelslike_c}
        feelslike_f={hourData.feelslike_f}
        temp_c={hourData.temp_c}
        temp_f={hourData.temp_f}
      />
      {!!hourData.will_it_rain && (
        <RainInfo
          totalprecip_in={hourData.precip_in}
          totalprecip_mm={hourData.precip_mm}
          daily_chance_of_rain={hourData.chance_of_rain}
        />
      )}
      {!!hourData.will_it_snow && (
        <SnowInfo
          daily_chance_of_snow={hourData.chance_of_snow}
          totalsnow_cm={hourData.snow_cm}
        />
      )}
    </PageScrollView>
  );
};

export default Hour;
