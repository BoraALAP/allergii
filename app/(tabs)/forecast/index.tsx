import { useContext } from "react";

import { GlobalContext } from "../../../context/global";
import { ApiDataContext } from "../../../context/apidata";
import { PageScrollView } from "@/components/ui/Containers";

import Loading from "@/components/ui/Loading";

import { DayCard } from "@/components/ui/DayCard";

const Forecast = () => {
  const { state } = useContext(GlobalContext);

  const { apiDataState } = useContext(ApiDataContext);

  if (state.loading || !apiDataState.current || !apiDataState.location) {
    return <Loading />;
  }

  return (
    <PageScrollView center>
      {apiDataState.forecast.forecastday.map((day) => (
        <DayCard day={day} key={day.date_epoch} />
      ))}
    </PageScrollView>
  );
};

export default Forecast;
