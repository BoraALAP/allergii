import { FIREBASE_DB, FIREBASE_MODEL } from "@/firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";

import { SettingsType } from "@/context/user";
import { GenerateContentRequest } from "firebase/vertexai-preview";

export const useUpdateSettings = async (
  uid: string,
  settings: SettingsType
) => {
  try {
    updateDoc(doc(FIREBASE_DB, `users/${uid}`), {
      [`settings`]: settings,
    });
    console.log("User setting updated successfully");
  } catch (error) {
    console.error("Error updating user setting:", error);
  }
};

export const useAddDayData = async (uid: string, data: DocumentData) => {
  try {
    await addDoc(collection(FIREBASE_DB, `users/${uid}/data`), {
      ...data,
      date: new Date(),
    });
    console.log("Data added successfully");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export const useUpdateDayData = async (
  uid: string,
  id: string,
  data: DocumentData
) => {
  try {
    await updateDoc(doc(FIREBASE_DB, `users/${uid}/data/${id}`), {
      ...data,
      date: new Date(),
    });
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const systemInstruction =
  "Here is the rules: language should be simple and easy to understand. They will reading this message. Do not use phrases like you reported or based on the information you gave me. be more direct";

// After user gives their input
export const useFirebaseAI = async (weatherData: any, userInput: any) => {
  const prompt = `based on the information provided. can you give a suggestions to how the user can manage their symptopms?`;

  const request = `here is the weather data of the day ${JSON.stringify(
    weatherData
  )}. Here is the user input of the day ${JSON.stringify(
    userInput
  )}. ${prompt}. ${systemInstruction} keep it 3 sentences or less. You are making an assumption, so it should be informative.`;

  try {
    const result = await FIREBASE_MODEL.generateContent(request);
    console.log("result", result.response.text());

    return result.response.text();
  } catch (error) {
    console.error("Error getting suggestion:", error);
  }
};

// Give a summary of of the useFirebaseAI
export const useFirebaseAISummary = async (
  weatherData: any,
  userInput: any
) => {
  const prompt = `based on this weather data and user input about how the user is feeling so far, can you give a suggestions to how can they manage their symptopms?`;

  const request = `here is the weather data of the day ${JSON.stringify(
    weatherData
  )}. Here is the user input of the day ${JSON.stringify(
    userInput
  )}. ${prompt}. ${systemInstruction} keep it 1 sentences. This result will be visible to the user in the day or later date. so speaking in past tense is better.`;

  try {
    const result = await FIREBASE_MODEL.generateContent(request);
    console.log("result", result.response.text());

    return result.response.text();
  } catch (error) {
    console.error("Error getting suggestion:", error);
  }
};

// if user didn't give their input yet
export const useFirebaseAISuggestion = async (
  weatherData: any,
  previousData: any
) => {
  const prompt = `based on this weather data of the day and user input from previous days about how the user is feeling so far, can you give a suggestions to how can they manage their symptopms?`;

  const request = `here is the weather data ${JSON.stringify(
    weatherData
  )}. This is previous data containing weather and users information how they were feeling that day ${JSON.stringify(
    previousData
  )}. ${prompt}. ${systemInstruction} keep it 3 sentences or less. language can use may, could, possible etc.`;

  try {
    const result = await FIREBASE_MODEL.generateContent(request);
    console.log("result", result.response.text());

    return result.response.text();
  } catch (error) {
    console.error("Error getting suggestion:", error);
  }
};
