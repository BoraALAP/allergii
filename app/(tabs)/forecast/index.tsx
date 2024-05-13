import { useContext, useEffect } from "react";

import { GlobalContext } from "../../../context/global";
import { ApiDataContext } from "../../../context/apidata";
import { PageScrollView, PageView } from "@/ui/Containers";
import { Text, SectionTitle } from "@/ui/Typography";
import Loading from "@/ui/Loading";
import { Link, router } from "expo-router";
import { DayType, ForecastType } from "@/types/api";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import RealTime from "@/components/RealTime";

const Forecast = () => {
  const { state } = useContext(GlobalContext);

  const { apiDataState } = useContext(ApiDataContext);

  if (state.loading || !apiDataState.current || !apiDataState.location) {
    return <Loading />;
  }

  const data = apiDataState.forecast.forecastday.filter((day) => {
    // write the condition that will filter today out of the array. use base on the date_epoch property
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0); // set time to start of the day
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set time to start of the day

    // compare dates
    return dayDate.getTime() !== today.getTime();
  });

  return (
    <PageScrollView center>
      {data.map((day) => (
        <DayCard day={day} key={day.date_epoch} />
      ))}
    </PageScrollView>
  );
};

export default Forecast;

const DayCard = ({ day }: { day: ForecastType }) => {
  return (
    <ClickArea
      key={day.date_epoch}
      onPress={() =>
        router.navigate({
          pathname: "/(tabs)/forecast/[day]",
          params: { day: day.date_epoch },
        })
      }
    >
      <RealTime
        day={day.date_epoch}
        temp={{
          c: day.day.maxtemp_c,
          f: day.day.maxtemp_f,
        }}
        feelslike={{
          c: day.day.mintemp_c,
          f: day.day.mintemp_f,
        }}
        is_day={1}
        humidity={day.day.avghumidity}
        condition={day.day.condition}
      />
    </ClickArea>
  );
};

const ClickArea = styled(TouchableOpacity)`
  border-radius: ${({ theme }) => theme.border.radius.button};
  display: flex;
  align-items: center;
  width: 100%;
`;
