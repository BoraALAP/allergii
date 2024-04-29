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
      {/* <SectionTitle>Forecast</SectionTitle> */}
      {data.map((day) => (
        <DayCard day={day} key={day.date_epoch} />
      ))}
    </PageScrollView>
  );
};

export default Forecast;

const DayCard = ({ day }: { day: ForecastType }) => {
  const { state } = useContext(GlobalContext);
  return (
    <ClickArea
      key={day.date_epoch}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/forecast/[day]/day",
          params: { day: day.date_epoch },
        })
      }
    >
      <Text>
        {Intl.DateTimeFormat("en-US", {
          day: "numeric",
          weekday: "long",
        }).format(new Date(day.date))}
      </Text>
      <Text>
        {state.settings.tempType === 0
          ? `${day.day.maxtemp_c} °C`
          : `${day.day.maxtemp_f} °F`}
      </Text>
      <Text>
        {state.settings.tempType === 0
          ? `${day.day.avgtemp_c} °C`
          : `${day.day.avgtemp_f} °F`}
      </Text>
      <Text>
        {state.settings.tempType === 0
          ? `${day.day.mintemp_c} °C`
          : `${day.day.mintemp_f} °F`}
      </Text>
    </ClickArea>
  );
};

const ClickArea = styled(TouchableOpacity)`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.border.radius.button};
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.clickable.bg};
  width: 100%;
`;
