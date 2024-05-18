import RealTime from "@/components/RealTime";
import WindInfo from "@/components/WindInfo";
import RainInfo from "@/components/RainInfo";
import { ApiDataContext } from "@/context/apidata";
import { GlobalContext } from "@/context/global";

import { HourType } from "@/types/api";

import { DividerH } from "@/ui/Elements";

import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components";
import Loading from "@/ui/Loading";
import { SectionTitle } from "@/ui/Typography";

const ModalScreen = () => {
  const search = useLocalSearchParams();

  // const { nowAiState, nowAiDispatch } = useContext(NowAiContext);

  const { apiDataState } = useContext(ApiDataContext);

  const detail =
    apiDataState.forecast.forecastday
      .map((day) =>
        day.hour.find(
          (hour: HourType) =>
            hour.time_epoch === parseInt(search.hour as string)
        )
      )
      .find((hour) => hour !== undefined) ?? ({} as HourType);

  // time_epoch
  // AI FETCH REQUEST
  // useEffect(() => {
  //   (async () => {
  //     await fetchAIData(
  //       apiDataState,
  //       nowAiDispatch,
  //       state.settings.distanceType,
  //       state.settings.tempType
  //     );
  //     setLoading(false);
  //   })();
  // }, []);

  if (!detail.temp_c) {
    return (
      <ViewContainer>
        <Loading />
      </ViewContainer>
    );
  }

  return (
    <ViewContainer>
      <RealTime
        cloud={detail.cloud}
        condition={detail.condition}
        is_day={detail.is_day}
        humidity={detail.humidity}
        location={{
          name: Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }).format(new Date(detail.time)),
        }}
        temp={{
          c: detail.temp_c,
          f: detail.temp_f,
        }}
        feelslike={{
          c: detail.feelslike_c,
          f: detail.feelslike_f,
        }}
      />
      {!!detail.will_it_rain ||
        (!!detail.will_it_snow && (
          <>
            <DividerH />
            <RainInfo
              precip_in={detail.precip_in}
              precip_mm={detail.precip_mm}
              chance_of_rain={detail.chance_of_rain}
              chance_of_snow={detail.chance_of_snow}
              will_it_rain={detail.will_it_rain}
              will_it_snow={detail.will_it_snow}
              snow_cm={detail.snow_cm}
            />
          </>
        ))}
      <DividerH />
      <WindInfo
        wind_degree={detail.wind_degree}
        wind_dir={detail.wind_dir}
        wind_kph={detail.wind_kph}
        wind_mph={detail.wind_mph}
        gust_kph={detail.gust_kph}
        gust_mph={detail.gust_mph}
        vis_km={detail.vis_km}
        vis_miles={detail.vis_miles}
        precip_in={detail.precip_in}
        precip_mm={detail.precip_mm}
      />
    </ViewContainer>
  );
};

export default ModalScreen;

const ViewContainer = styled(View)`
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 48px;
  gap: 16px;
  bottom: 0;
`;
