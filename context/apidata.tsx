import { createContext } from "react";
import {
  ActionType,
  AlertType,
  CurrentStateType,
  ForecastType,
  GoogleAirQualityType,
  LocationType,
} from "../types/api";
import { storeData } from "../func/storage";

// Define your action types

// type for apiDataState
export type ApiDataStateType = {
  forecast: {
    forecastday: ForecastType[];
  };
  current: CurrentStateType | undefined;
  location: LocationType | undefined;
  alerts: { alert: AlertType[] };
  googleairquality: GoogleAirQualityType;
};

// Define the apiData state of the app
export const apiDataInitialState = {
  forecast: {
    forecastday: null,
  },
  current: null,
  location: null,
  astro: null,
  alerts: { alert: [] },
  googleairquality: null,
};

// setup a global context to store the user's location and weather data. This will allow us to access this data from any component in our app.
export const ApiDataContext = createContext<{
  apiDataState: ApiDataStateType;
  apiDataDispatch: React.Dispatch<ActionType>;
}>({
  apiDataState: apiDataInitialState as any, // Replace with your apiData state
  apiDataDispatch: () => null, // apiData dispatch function
});

// setup a reducer function to update the global state. This function will take the current state and an action as arguments, and return the new state based on the action type.
export const apiDataReducer = (state: ApiDataStateType, action: any) => {
  switch (action.type) {
    case "LOAD_DATA":
      storeData(action.payload, "apiData");

      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
