import { PageScrollView } from "@/ui/Containers";

import { useContext } from "react";

import { GlobalContext } from "@/context/global";
import { ApiDataContext } from "@/context/apidata";

import Loading from "@/ui/Loading";
import AstroInfo from "@/components/AstroInfo";

import TempInfo from "@/components/day/TempInfo";
import RainInfo from "@/components/day/RainInfo";
import SnowInfo from "@/components/day/SnowInfo";
import AirQuality from "@/components/AirQuality";
import WindInfo from "@/components/day/WindInfo";
import RealTime from "@/components/day/RealTime";
import Hours from "@/components/Hours";

const TodayPage = () => {
  const { state } = useContext(GlobalContext);
  const { apiDataState } = useContext(ApiDataContext);

  if (state.loading || !apiDataState.current || !apiDataState.location) {
    return <Loading />;
  }

  const {
    condition,
    avgtemp_c,
    avgtemp_f,
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
    totalprecip_in,
    totalprecip_mm,
    daily_chance_of_rain,
    daily_chance_of_snow,
    totalsnow_cm,
    maxwind_kph,
    maxwind_mph,
    avgvis_km,
    avgvis_miles,
    air_quality,
    avghumidity,
    uv,
    daily_will_it_rain,
    daily_will_it_snow,
  } = apiDataState.forecast.forecastday[0].day;

  return (
    <PageScrollView center>
      <RealTime condition={condition} avghumidity={avghumidity} uv={uv} />
      <Hours
        hours={apiDataState.forecast.forecastday[0].hour}
        today
        day={apiDataState.forecast.forecastday[0].date_epoch}
      />
      <TempInfo
        avgtemp_c={avgtemp_c}
        avgtemp_f={avgtemp_f}
        maxtemp_c={maxtemp_c}
        maxtemp_f={maxtemp_f}
        mintemp_c={mintemp_c}
        mintemp_f={mintemp_f}
      />
      {!!daily_will_it_rain && (
        <RainInfo
          totalprecip_in={totalprecip_in}
          totalprecip_mm={totalprecip_mm}
          daily_chance_of_rain={daily_chance_of_rain}
        />
      )}
      {!!daily_will_it_snow && (
        <SnowInfo
          daily_chance_of_snow={daily_chance_of_snow}
          totalsnow_cm={totalsnow_cm}
        />
      )}
      <WindInfo
        maxwind_kph={maxwind_kph}
        maxwind_mph={maxwind_mph}
        avgvis_km={avgvis_km}
        avgvis_miles={avgvis_miles}
      />
      <AstroInfo astro={apiDataState.forecast.forecastday[0].astro} />
      {air_quality && <AirQuality airQuality={air_quality} />}
    </PageScrollView>
  );
};

export default TodayPage;
