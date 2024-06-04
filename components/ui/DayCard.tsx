import { ForecastType } from "@/types/api";
import { router } from "expo-router";
import RealTime from "../RealTime";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

export const DayCard = ({ day }: { day: ForecastType }) => {
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
