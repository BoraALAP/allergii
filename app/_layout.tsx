import "expo-dev-client";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  PragatiNarrow_400Regular,
  PragatiNarrow_700Bold,
} from "@expo-google-fonts/pragati-narrow";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";

import { dark, light } from "@/constants/Theme";

import { GlobalContext, initialState, reducer } from "../context/global";
import { getData } from "../func/storage";
import {
  ApiDataContext,
  apiDataInitialState,
  apiDataReducer,
} from "../context/apidata";

import { NoPermission } from "./noPermission";

import PushNotification from "@/lib/pushNotification";
import fetchData from "@/func/fetchData";
import { NowAiContext, nowAiInitialState, nowAiReducer } from "@/context/nowai";
import { useColorScheme } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PragatiNarrow_400Regular,
    PragatiNarrow_700Bold,
    Lato_400Regular,
    Lato_700Bold,
    ...FontAwesome.font,
  });
  const colorScheme = useColorScheme();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [apiDataState, apiDataDispatch] = useReducer(
    apiDataReducer,
    apiDataInitialState
  );

  const [nowAiState, nowAiDispatch] = useReducer(
    nowAiReducer,
    nowAiInitialState
  );

  useEffect(() => {
    console.log("Root Layout Loaded");

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Alert.alert("Permission to access location was denied");

        dispatch({
          type: "SET_NO_LOCATION_PERMISSION",
        });

        return;
      }
      dispatch({
        type: "SET_LOCATION_PERMISSION",
      });

      // Load global data
      const globalData = await getData("global");
      if (globalData) {
        dispatch({
          type: "LOAD_DATA",
          payload: globalData,
        });
      }

      // Load API data or fetch new data
      const apiData = await getData("apiData");

      if (apiData) {
        if (
          new Date().getTime() -
            new Date(apiData.current.last_updated).getTime() >
          21600000
        ) {
          fetchData(apiDataDispatch, dispatch);
        } else {
          apiDataDispatch({
            type: "LOAD_DATA",
            payload: apiData,
          });
        }
      } else {
        fetchData(apiDataDispatch, dispatch);
      }

      // Set loading to false
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    })();
  }, []);

  useEffect(() => {
    dispatch({
      type: "SET_DARK_MODE",
      payload: colorScheme === "dark" ? true : false,
    });
  }, [colorScheme]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !state.loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, state.loading]);

  if (!loaded && !state.loading) {
    return null;
  }

  if (state.locationPermission === false) {
    return (
      <GlobalContext.Provider value={{ state, dispatch }}>
        <ApiDataContext.Provider value={{ apiDataState, apiDataDispatch }}>
          <NowAiContext.Provider value={{ nowAiState, nowAiDispatch }}>
            <ThemeProvider theme={state.dark ? dark : light}>
              <NoPermission />
            </ThemeProvider>
          </NowAiContext.Provider>
        </ApiDataContext.Provider>
      </GlobalContext.Provider>
    );
  }

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <ApiDataContext.Provider value={{ apiDataState, apiDataDispatch }}>
        <NowAiContext.Provider value={{ nowAiState, nowAiDispatch }}>
          <ThemeProvider theme={state.dark ? dark : light}>
            {state.notifications == 0 && <PushNotification />}
            <Stack screenOptions={{}}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </NowAiContext.Provider>
      </ApiDataContext.Provider>
    </GlobalContext.Provider>
  );
}
