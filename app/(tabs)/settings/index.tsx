import { useContext, useEffect } from "react";
import * as Updates from "expo-updates";
import styled from "styled-components";

import { GlobalContext } from "../../../context/global";
import { storeData } from "../../../func/storage";

import { Caption, SectionTitle, Text } from "@/components/ui/Typography";
import { PageScrollView, PageView, View } from "@/components/ui/Containers";
import { SegmentedControlComponent } from "@/components/ui/SegmentedControl";

const Setting = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const {
    currentlyRunning,
    isUpdateAvailable,
    isUpdatePending,
    availableUpdate,
    downloadedUpdate,
  } = Updates.useUpdates();

  const updateId = Updates.updateId;
  console.log(
    "isUpdateAvailable",
    isUpdateAvailable,
    "isUpdatePending",
    isUpdatePending,
    "currentlyRunning",
    currentlyRunning,
    "availableUpdate",
    availableUpdate,
    "downloadedUpdate",
    downloadedUpdate,
    "updateId",
    updateId
  );

  useEffect(() => {
    storeData(state, "global");
  }, [state.settings]);

  return (
    <PageScrollView>
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
      <Container>
        <Caption color="soft">
          {currentlyRunning.isEmbeddedLaunch
            ? "This app is running from built-in code"
            : "This app is running an update"}
        </Caption>
        <Caption color="soft">
          Build version: {currentlyRunning.runtimeVersion}
        </Caption>
        {updateId && <Caption color="soft">Update ID: {updateId}</Caption>}
      </Container>
    </PageScrollView>
  );
};

const ViewContainer = styled(View)`
  width: 100%;
  gap: 16px;
`;

const Container = styled(View)`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.card.background};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  elevation: 4;
  margin-top: 16px;
  align-items: center;
`;

export default Setting;
