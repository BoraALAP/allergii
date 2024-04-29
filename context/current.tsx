import { createContext } from "react";
import { storeData } from "../func/storage";
import { ActionType, LocationType, MomentType } from "../types/api";

// Define your action types

// type for currentState
export type CurrentStateType = {
  location: LocationType;
  current: {
    last_updated: string; //	Local time when the real time data was updated.
    last_updated_epoch: number; //	Local time when the real time data was updated in unix time.
  } & MomentType; //
};

// Define the forecast state of the app
export const currentInitialState = {
  location: {
    name: "",
    country: "",
    localtime: new Date(),
    tz_id: "",
    lat: 0,
    lon: 0,
    region: "",
    timezone_id: "",
  },
  current: {
    last_updated: new Date(628021800000).toString(),
    last_updated_epoch: 628021800000,

    temp_c: 0,
    temp_f: 0,
    condition: {
      text: "",
      icon: "",
      code: 0,
    },
    is_day: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    humidity: 0,
    wind_kph: 0,
    wind_mph: 0,
    wind_dir: "",
    wind_degree: 0,
    cloud: 0,
    uv: 0,
    gust_kph: 0,
    gust_mph: 0,
    vis_km: 0,
    vis_miles: 0,
    pressure_mb: 0,
    pressure_in: 0,
    precip_mm: 0,
    precip_in: 0,
    air_quality: {
      co: 0,
      no2: 0,
      o3: 0,
      so2: 0,
      pm25: 0,
      pm10: 0,
      "us-epa-index": 0,
      "gb-defra-index": 0,
    },
  },
};

// setup a global context to store the user's location and weather data. This will allow us to access this data from any component in our app.
export const CurrentContext = createContext<{
  currentState: CurrentStateType;
  currentDispatch: React.Dispatch<ActionType>;
}>({
  currentState: currentInitialState, // Replace with your forecast state
  currentDispatch: () => null, // forecast dispatch function
});

// setup a reducer function to update the global state. This function will take the current state and an action as arguments, and return the new state based on the action type.
export const currentReducer = (state: CurrentStateType, action: any) => {
  switch (action.type) {
    case "LOAD_DATA":
      storeData(action.payload, "current");

      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
