import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/global";

import { storeData } from "../../../func/storage";
import { PageView, View } from "@/components/ui/Containers";
import { Text } from "@/components/ui/Typography";
import styled from "styled-components";

import { SegmentedControlComponent } from "@/components/ui/SegmentedControl";

const Setting = () => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    storeData(state, "global");
  }, [state.settings]);

  return (
    <PageView>
      <ViewContainer>
        <Text>Temprature Type</Text>
        <SegmentedControlComponent
          values={["Censuis", "Farhenheit"]}
          selectedIndex={state.settings.tempType}
          onChange={(result) => {
            dispatch({
              type: "SET_TEMP_TYPE",
              payload: result,
            });
          }}
        />
      </ViewContainer>
      <ViewContainer>
        <Text>Distance Type</Text>
        <SegmentedControlComponent
          values={["Kilometer", "Miles"]}
          selectedIndex={state.settings.distanceType}
          onChange={(result) => {
            dispatch({
              type: "SET_DIRECTION_TYPE",
              payload: result,
            });
          }}
        />
      </ViewContainer>
      <ViewContainer>
        <Text>Is Allergy Information Important For You?</Text>
        <SegmentedControlComponent
          values={["Yes", "No"]}
          selectedIndex={state.settings.allergy}
          onChange={(result) => {
            dispatch({
              type: "SET_ALLERGY",
              payload: result,
            });
          }}
        />
      </ViewContainer>
      {/* <ViewContainer>
        <Text>Push Notifications</Text>
        <SegmentedControlS
          values={["Yes", "No"]}
          selectedIndex={state.settings.notifications}
          onChange={(event) => {
            dispatch({
              type: "SET_NOTIFICATIONS",
              payload: event.nativeEvent.selectedSegmentIndex,
            });
          }}
        />
      </ViewContainer> */}
    </PageView>
  );
};

const ViewContainer = styled(View)`
  width: 100%;
  gap: 16px;
`;

export default Setting;
