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

import fetchData from "@/func/fetchData";
import { NowAiContext, nowAiInitialState, nowAiReducer } from "@/context/nowai";
import { Platform, useColorScheme } from "react-native";
import { err } from "react-native-svg";

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
  //on load check the location permission and save the location in the global state
  useEffect(() => {
    (async () => {
      const globalData = await getData("global");

      if (globalData) {
        dispatch({
          type: "LOAD_DATA",
          payload: globalData,
        });
      }

      dispatch({
        type: "SET_DARK_MODE",
        payload: colorScheme === "dark" ? true : false,
      });

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        // Alert.alert("Permission to access location was denied");
        dispatch({
          type: "SET_NO_LOCATION_PERMISSION",
        });

        return;
      } else {
        // Load global data

        dispatch({
          type: "SET_LOCATION_PERMISSION",
        });
        const {
          coords: { longitude, latitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });

        await dispatch({
          type: "SET_LOCATION",
          payload: { latitude, longitude },
        });
      }
    })();
  }, []);

  //if location changes in global state, fetch the data from the apis
  useEffect(() => {
    (async () => {
      await dispatch({
        type: "SET_LOADING",
        payload: true,
      });
      const result = await fetchData(state.location);

      apiDataDispatch({
        type: "LOAD_DATA",
        payload: result,
      });

      // Set loading to false
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    })();
  }, [state.location]);

  // Set dark mode based on the device color scheme
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

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <ApiDataContext.Provider value={{ apiDataState, apiDataDispatch }}>
        <NowAiContext.Provider value={{ nowAiState, nowAiDispatch }}>
          <ThemeProvider theme={state.dark ? dark : light}>
            {/* {state.notifications == 0 && <PushNotification />} */}
            <Stack initialRouteName="(tabs)/now">
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="hourmodal"
                options={{
                  title: "",
                  presentation:
                    Platform.OS === "ios"
                      ? "modal"
                      : "containedTransparentModal",
                  headerShown: false,
                  contentStyle: {
                    bottom: 0,
                    width: "100%",
                    position: "absolute",
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                    elevation: 8,
                    backgroundColor: state.dark
                      ? dark.colors.page.bg.start
                      : light.colors.page.bg.start,
                  },
                }}
              />
            </Stack>
          </ThemeProvider>
        </NowAiContext.Provider>
      </ApiDataContext.Provider>
    </GlobalContext.Provider>
  );
}
