// Define your action types

import { ActionType } from "@/types/api";
import { createContext } from "react";

// type for nowAiState
export type NowAiStateType = {
  message: null | [any];
  loading: boolean;
};

// Define the nowAi state of the app
export const nowAiInitialState = { message: null, loading: true };

// setup a global context to store the user's location and weather data. This will allow us to access this data from any component in our app.
export const NowAiContext = createContext<{
  nowAiState: NowAiStateType;
  nowAiDispatch: React.Dispatch<ActionType>;
}>({
  nowAiState: nowAiInitialState as any, // Replace with your nowAi state
  nowAiDispatch: () => null, // nowAi dispatch function
});

// setup a reducer function to update the global state. This function will take the current state and an action as arguments, and return the new state based on the action type.
export const nowAiReducer = (state: NowAiStateType, action: any) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case "FETCH_DATA":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
