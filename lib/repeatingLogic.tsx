import * as Location from "expo-location";

import { GlobalContext } from "@/context/global";
import { getData } from "@/func/storage";
import useFetch from "@/func/useFetch";
import { PropsWithChildren, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { ApiDataContext } from "@/context/apidata";

const RepeatingLogic = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const { loading, fetchData } = useFetch();

  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (loading) {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  }, [loading]);

  useEffect(() => {
    fetchData(state.location.latitude, state.location.longitude);
  }, [state.location]);

  // Set dark mode based on the device color scheme
  useEffect(() => {
    dispatch({
      type: "SET_DARK_MODE",
      payload: colorScheme === "dark" ? true : false,
    });
  }, [colorScheme]);

  return children;
};

export default RepeatingLogic;
