import { createContext, useEffect, useReducer } from "react";

import * as Notifications from "expo-notifications";

// Define your action types
type ActionType = {
  type: string;
  payload?: any;
};

// type for initialState
export type InitialStateType = {
  location: {
    latitude: number;
    longitude: number;
  };
  locationPermission: boolean;
  settings: {
    tempType: number;
    distanceType: number;
    allergy: number;
    notifications: number;
  };
  loading: boolean;
  errorMsg: string | null;
  dark: boolean;
};

// Define the initial state of the app
export const initialState = {
  location: {
    latitude: 51.507218,
    longitude: -0.127586,
  },
  locationPermission: false,
  settings: {
    allergy: 1,
    tempType: 0, //0 is celsius, 1 is fahrenheit
    distanceType: 0, //0 is km, 1 is miles
    notifications: 0,
  },
  loading: true,
  errorMsg: null,
  dark: false,
};

// setup a global context to store the user's location and weather data. This will allow us to access this data from any component in our app.
export const GlobalContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState, // Replace with your initial state
  dispatch: () => null, // Initial dispatch function
});

// setup a reducer function to update the global state. This function will take the current state and an action as arguments, and return the new state based on the action type.
export const reducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      return {
        ...state,
        dark: action.payload,
      };

    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };

    case "SET_NO_LOCATION_PERMISSION":
      return {
        ...state,
        locationPermission: false,
        loading: false,
      };

    case "SET_LOCATION_PERMISSION":
      return {
        ...state,
        locationPermission: true,
      };

    case "SET_NOTIFICATIONS":
      action.payload === 1 &&
        Notifications.cancelAllScheduledNotificationsAsync();
      return {
        ...state,
        settings: {
          ...state.settings,
          notifications: action.payload,
        },
      };

    case "SET_TEMP_TYPE":
      return {
        ...state,
        settings: {
          ...state.settings,
          tempType: action.payload,
        },
      };

    case "SET_DIRECTION_TYPE":
      return {
        ...state,
        settings: {
          ...state.settings,
          distanceType: action.payload,
        },
      };

    case "SET_ALLERGY":
      return {
        ...state,
        settings: {
          ...state.settings,
          allergy: action.payload,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        errorMsg: action.payload,
      };

    case "LOAD_DATA":
      return {
        ...state,
        ...action.payload,
        loading: true,
      };

    default:
      return state;
  }
};
