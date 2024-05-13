import React, { useContext } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import Hours from "@/components/Hours";
import AstroInfo from "@/components/AstroInfo";
import { ApiDataContext } from "@/context/apidata";
import { PageScrollView } from "@/ui/Containers";
import Loading from "@/ui/Loading";
import RealTime from "@/components/RealTime";
import DayDetails from "@/components/DayDetails";
import { DividerH } from "@/ui/Elements";
import RainInfo from "@/components/RainInfo";
import { global } from "@/constants/Theme";

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
    <PageScrollView>
      <Stack.Screen
        options={{
          headerBackTitleStyle: {
            fontFamily: global.font.family.primaryBold,
          },
          title: Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }).format(new Date(data.date_epoch * 1000)),
        }}
      />
      <RealTime
        temp={{ c: data.day.avgtemp_c, f: data.day.avgtemp_f }}
        is_day={1}
        condition={data.day.condition}
        humidity={data.day.avghumidity}
      />
      <DividerH />
      <DayDetails day={data.day} />
      {data.day.daily_will_it_rain === 1 &&
        data.day.daily_will_it_snow === 1 && (
          <>
            <DividerH />
            <RainInfo
              chance_of_rain={data.day.daily_chance_of_rain}
              chance_of_snow={data.day.daily_chance_of_snow}
              will_it_rain={data.day.daily_will_it_rain}
              will_it_snow={data.day.daily_will_it_snow}
              precip_in={data.day.totalprecip_in}
              precip_mm={data.day.totalprecip_mm}
              snow_cm={data.day.totalsnow_cm}
            />
          </>
        )}
      <DividerH />
      <Hours hours={data.hour} day={data.date_epoch} />
      <DividerH />
      <AstroInfo astro={data.astro} />
    </PageScrollView>
  );
};

export default Day;
