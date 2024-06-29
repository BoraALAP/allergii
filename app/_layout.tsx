import "expo-dev-client";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";

import { useFonts } from "expo-font";
import {
  PragatiNarrow_400Regular,
  PragatiNarrow_700Bold,
} from "@expo-google-fonts/pragati-narrow";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { useEffect, useState } from "react";

import Splash from "@/components/Splash";

import Providers from "@/lib/Providers";
import LoadingLogic from "@/lib/loadingLogic";
import RepeatingLogic from "@/lib/repeatingLogic";
import Navigation from "@/lib/Navigation";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  //   // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/(tabs)/now",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

WebBrowser.maybeCompleteAuthSession();
export default function RootLayout() {
  const [appInitialized, setAppInitialized] = useState(false);

  const [loaded, fontError] = useFonts({
    PragatiNarrow_400Regular,
    PragatiNarrow_700Bold,
    Lato_400Regular,
    Lato_700Bold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!appInitialized) {
    return (
      <Providers>
        <LoadingLogic complete={() => setAppInitialized(true)}>
          <Splash />
        </LoadingLogic>
      </Providers>
    );
  }

  return (
    <Providers>
      <RepeatingLogic>
        <Navigation />
      </RepeatingLogic>
    </Providers>
  );
}
