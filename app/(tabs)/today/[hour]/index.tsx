import RealTime from "@/components/RealTime";

import WindInfo from "@/components/WindInfo";
import RainInfo from "@/components/day/RainInfo";
import SnowInfo from "@/components/day/SnowInfo";
import { ApiDataContext } from "@/context/apidata";
import { GlobalContext } from "@/context/global";
import { PageScrollView } from "@/ui/Containers";
import Loading from "@/ui/Loading";
import { Text, SectionTitle } from "@/ui/Typography";

import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";

const index = () => {
  const { hour } = useLocalSearchParams();
  const { apiDataState } = useContext(ApiDataContext);
  const { state } = useContext(GlobalContext);

  const data = apiDataState.forecast.forecastday[0].hour.find(
    (item) => item.time_epoch === parseInt(hour as string)
  );

  if (!data) {
    return <Loading />;
  }

  return (
    <PageScrollView center>
      <Text>
        {Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(data.time))}
      </Text>
      <SectionTitle>
        {state.settings.tempType === 0
          ? `${data.temp_c} °C`
          : `${data.temp_f} °F`}
      </SectionTitle>

      <RealTime
        condition={data.condition}
        uv={data.uv}
        humidity={data.humidity}
        is_day={data.is_day}
        cloud={data.cloud}
      />

      <WindInfo
        wind_kph={data.wind_kph}
        wind_mph={data.wind_mph}
        wind_degree={data.wind_degree}
        wind_dir={data.wind_dir}
        gust_kph={data.gust_kph}
        gust_mph={data.gust_mph}
        vis_km={data.vis_km}
        vis_miles={data.vis_miles}
      />
      <TempInfo
        feelslike_c={data.feelslike_c}
        feelslike_f={data.feelslike_f}
        temp_c={data.temp_c}
        temp_f={data.temp_f}
      />
      {!!data.will_it_rain && (
        <RainInfo
          totalprecip_in={data.precip_in}
          totalprecip_mm={data.precip_mm}
          daily_chance_of_rain={data.chance_of_rain}
        />
      )}
      {!!data.will_it_snow && (
        <SnowInfo
          daily_chance_of_snow={data.chance_of_snow}
          totalsnow_cm={data.snow_cm}
        />
      )}
    </PageScrollView>
  );
};

export default index;
