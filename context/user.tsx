import { createContext } from "react";
import * as Notifications from "expo-notifications";

import { storeData } from "../func/storage";
import { ActionType } from "../types/api";
import { UserCredential } from "firebase/auth";

// Define your action types

export type SettingsType = {
  tempType: number;
  distanceType: number;
  allergy: number;
  notifications: number;
  darkmode: true | false | "system";
};

type UserStateType = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  settings: SettingsType;
  subscriptions: {
    pro: {
      id: string;
    } | null;
  };
};
export const userInitialState = {
  uid: "",
  firstName: "",
  lastName: "",
  email: "",
  settings: {
    allergy: 1,
    tempType: 0, //0 is celsius, 1 is fahrenheit
    distanceType: 0, //0 is km, 1 is miles
    notifications: 0,
    darkmode: false,
  },
  subscriptions: {
    pro: null,
  },
};

// setup a global context to store the user's location and weather data. This will allow us to access this data from any component in our app.
export const UserContext = createContext<{
  userState: UserStateType;
  userDispatch: React.Dispatch<ActionType>;
}>({
  userState: userInitialState, // Replace with your forecast state
  userDispatch: () => null, // forecast dispatch function
});

// setup a reducer function to update the global state. This function will take the user state and an action as arguments, and return the new state based on the action type.
export const userReducer = (state: UserStateType, action: any) => {
  switch (action.type) {
    case "LOAD_USER_PREFERENCES":
      return {
        ...state,
        ...action.payload,
      };
    case "ADD_ID":
      return {
        ...state,
        uid: action.payload,
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

    default:
      return state;
  }
};
