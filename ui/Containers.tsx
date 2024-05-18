import React, { useContext, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View as ViewBase,
} from "react-native";
import styled from "styled-components";
import { ApiDataContext } from "@/context/apidata";
import { GlobalContext } from "@/context/global";
import { NowAiContext } from "@/context/nowai";
import fetchAIData from "@/func/fetchAI";
import fetchData from "@/func/fetchData";
import PageBackgroundLinear from "./PageBackgroundLinear";

type PageViewProps = {
  children: React.ReactNode;
  center?: boolean;
  noPadding?: boolean;
};

export const PageView = ({ children, center, noPadding }: PageViewProps) => {
  return (
    <PageBackgroundLinear>
      <SafeAreaView>
        <PageContainer
          center={center}
          noPadding={noPadding}
          style={{ height: "100%" }}
        >
          {children}
        </PageContainer>
      </SafeAreaView>
    </PageBackgroundLinear>
  );
};
export const PageScrollView = ({
  children,
  center,
  noPadding,
}: PageViewProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const { apiDataState, apiDataDispatch } = useContext(ApiDataContext);
  const { state } = useContext(GlobalContext);
  const { nowAiDispatch } = useContext(NowAiContext);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log(await state.location);

    // on refresh fetch the data from apis
    const data = await fetchData(state.location);
    apiDataDispatch({ type: "LOAD_DATA", payload: await data });
    // await fetchAIData(
    //   apiDataState,
    //   nowAiDispatch,
    //   state.settings.distanceType,
    //   state.settings.tempType
    // );

    setRefreshing(false);
  }, []);

  return (
    <PageBackgroundLinear>
      {/* <SafeAreaView> */}
      <PageScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PageContainer center={center} noPadding={noPadding}>
          {children}
        </PageContainer>
      </PageScrollViewContainer>
      {/* </SafeAreaView> */}
    </PageBackgroundLinear>
  );
};
export const View = ({ children, center, ...otherProps }: PageViewProps) => {
  return (
    <Container center={center} {...otherProps}>
      {children}
    </Container>
  );
};

const Container = styled(ViewBase)<{ center?: boolean }>`
  align-items: ${(props) => (props.center ? "center" : "flex-start")};
`;

const PageContainer = styled(Container)<{ noPadding?: boolean }>`
  padding: ${(props) => (props.noPadding ? "24px 0px" : "24px")};
  gap: 16px;
`;

const PageScrollViewContainer = styled(ScrollView)`
  /* background-color: ${(props) => props.theme.colors.background}; */
  height: 100%;
`;

export const Grid = styled(View)`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
  flex: 1;
`;

export const ItemContainer = styled(View)<{ row?: boolean }>`
  gap: -8px;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: ${(props) => (props.row ? "space-between" : "flex-start")};
  min-width: 80px;
  width: 50%;
  /* width: auto; */
  flex: 1;
`;

export const Section = styled(ViewBase)<{ noPadding?: boolean }>`
  padding: ${(props) => (props.noPadding ? "0px" : "0px 24px")};
  gap: 16px;
  width: 100%;
`;
