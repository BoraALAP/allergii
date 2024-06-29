import React, { useContext } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import AstroInfo from "@/components/AstroInfo";
import { ApiDataContext } from "@/context/apidata";
import { PageScrollView, Section } from "@/components/ui/Containers";
import Loading from "@/components/ui/Loading";
import RealTime from "@/components/RealTime";
import DayDetails from "@/components/DayDetails";
import { DividerH } from "@/components/ui/Elements";
import RainInfo from "@/components/RainInfo";

import { Charts } from "@/components/Charts";

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
    <PageScrollView center noPadding>
      <Stack.Screen
        options={{
          title: Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }).format(new Date(data.date_epoch * 1000)),
        }}
      />
      <Section>
        <RealTime
          temp={{ c: data.day.avgtemp_c, f: data.day.avgtemp_f }}
          is_day={1}
          condition={data.day.condition}
          humidity={data.day.avghumidity}
        />
        <DividerH />
      </Section>
      <Section>
        <DayDetails day={data.day} />
        <DividerH />
      </Section>
      {data.day.daily_will_it_rain === 1 &&
        data.day.daily_will_it_snow === 1 && (
          <Section>
            <RainInfo
              chance_of_rain={data.day.daily_chance_of_rain}
              chance_of_snow={data.day.daily_chance_of_snow}
              will_it_rain={data.day.daily_will_it_rain}
              will_it_snow={data.day.daily_will_it_snow}
              precip_in={data.day.totalprecip_in}
              precip_mm={data.day.totalprecip_mm}
              snow_cm={data.day.totalsnow_cm}
            />
            <DividerH />
          </Section>
        )}
      <Charts hours={data.hour} />
      <Section>
        <DividerH />
      </Section>
      <Section>
        <AstroInfo astro={data.astro} />
      </Section>
    </PageScrollView>
  );
};

export default Day;
