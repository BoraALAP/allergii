// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENTID,
};

// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize the Vertex AI service
const vertexAI = getVertexAI(FIREBASE_APP);

// Initialize the generative model with a model that supports your use case
// Gemini 1.5 models are versatile and can be used with all API capabilities
export const FIREBASE_MODEL = getGenerativeModel(vertexAI, {
  model: "gemini-1.5-flash",
});

//get types from firebase
export type { User } from "firebase/auth";
export type {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Query,
  WhereFilterOp,
} from "firebase/firestore";
export type { Analytics } from "firebase/analytics";
