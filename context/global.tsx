import { createContext, useEffect, useReducer } from "react";

import { storeData } from "@/func/storage";

// Define your action types
type ActionType = {
  type: string;
  payload?: any;
};

// type for initialState
export type InitialStateType = {
  appInitialized: boolean;
  loading: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  locationPermission: boolean;
  errorMsg: string | null;
  dark: boolean;
};

// Define the initial state of the app
export const initialState = {
  appInitialized: false,
  loading: true,
  location: {
    latitude: 51.507218,
    longitude: -0.127586,
  },
  locationPermission: false,
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
      storeData(
        {
          ...state,
          location: action.payload,
        },
        "@global"
      );
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

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "APP_INITIALIZED":
      return {
        ...state,
        appInitialized: true,
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
