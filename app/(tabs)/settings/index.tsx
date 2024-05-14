import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/global";
import { StyleSheet } from "react-native";
import { storeData } from "../../../func/storage";
import { PageView, View } from "@/ui/Containers";
import { Text } from "@/ui/Typography";
import styled from "styled-components";
import { dark, global, light } from "@/constants/Theme";

const Setting = () => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    storeData(state, "global");
  }, [state.settings]);

  return (
    <PageView>
      <ViewContainer>
        <Text>Temprature Type</Text>
        <SegmentedControlS
          values={["Censuis", "Farhenheit"]}
          selectedIndex={state.settings.tempType}
          fontStyle={{ fontFamily: global.font.family.primary }}
          onChange={(event) => {
            dispatch({
              type: "SET_TEMP_TYPE",
              payload: event.nativeEvent.selectedSegmentIndex,
            });
          }}
        />
      </ViewContainer>
      <ViewContainer>
        <Text>Distance Type</Text>
        <SegmentedControlS
          values={["Kilometer", "Miles"]}
          selectedIndex={state.settings.distanceType}
          fontStyle={{ fontFamily: global.font.family.primary }}
          onChange={(event) => {
            dispatch({
              type: "SET_DIRECTION_TYPE",
              payload: event.nativeEvent.selectedSegmentIndex,
            });
          }}
        />
      </ViewContainer>
      <ViewContainer>
        <Text>Is Allergy Information Important For You?</Text>
        <SegmentedControlS
          values={["Yes", "No"]}
          selectedIndex={state.settings.allergy}
          fontStyle={{ fontFamily: global.font.family.primary }}
          onChange={(event) => {
            dispatch({
              type: "SET_ALLERGY",
              payload: event.nativeEvent.selectedSegmentIndex,
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

const SegmentedControlS = styled(SegmentedControl)`
  padding: 16px;
  width: 100%;
`;

export default Setting;
