import { ExpoConfig, ConfigContext } from "expo/config";

const getBundleID = () => {
  if (process.env.APP_VARIANT === "production") {
    return "com.boraalap.allergii.prod";
  }

  if (process.env.APP_VARIANT === "preview") {
    return "com.boraalap.allergii.prev";
  }

  return "com.boraalap.allergii";
};

const bundleID = getBundleID();

const getAppName = () => {
  if (process.env.APP_VARIANT === "production") {
    return "W-Allergy";
  }

  if (process.env.APP_VARIANT === "preview") {
    return "W-Allergy Preview";
  }

  return "W-Allergy Dev";
};

const appName = getAppName();

module.exports = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: appName,
  slug: "allergii",
  owner: "artticfox",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/appicon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#022B46",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: bundleID,
    icon: "./assets/appicon.png",
    backgroundColor: "#022B46",
    buildNumber: "0.0.14",
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "This is required to show you the weather in your area. You can change this in your settings.",
      NSLocationAlwaysAndWhenInUseUsageDescription:
        "This is required to show you the weather in your area. You can change this in your settings.",
    },
  },
  android: {
    package: bundleID,
    adaptiveIcon: {
      foregroundImage: "./assets/appicon.png",
      backgroundColor: "#022B46",
    },
    permissions: [
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
    ],
    versionCode: 4,
  },
  plugins: [
    "expo-router",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "This is required to show you the weather in your area. You can change this in your settings.",
      },
    ],
    "expo-localization",
    [
      "expo-notifications",
      {
        icon: "./assets/noti-appicon.png",
        color: "#022B46",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "f43b43c9-e8ea-4612-b835-fb4f51ab6222",
    },
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/f43b43c9-e8ea-4612-b835-fb4f51ab6222",
  },
});
