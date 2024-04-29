import { ApiDataContext } from "@/context/apidata";
import { GlobalContext } from "@/context/global";
import { NowAiContext } from "@/context/nowai";
import fetchAIData from "@/func/fetchAI";
import { PageView, View } from "@/ui/Containers";
import Loading from "@/ui/Loading";
import { Text } from "@/ui/Typography";
import React, { useContext, useEffect, useState } from "react";

const ModalScreen = () => {
  const { nowAiState, nowAiDispatch } = useContext(NowAiContext);
  const { state } = useContext(GlobalContext);
  const { apiDataState } = useContext(ApiDataContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchAIData(
        apiDataState,
        nowAiDispatch,
        state.settings.distanceType,
        state.settings.tempType
      );
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <PageView center>
        <Loading />
      </PageView>
    );
  }
  return (
    <PageView>
      {!nowAiState.loading &&
        nowAiState.message &&
        nowAiState.message.map((msg) => {
          return (
            <View key={msg.index}>
              <Text center>{msg.message.content}</Text>
            </View>
          );
        })}
    </PageView>
  );
};

export default ModalScreen;
