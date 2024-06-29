// create a firebase login signup hook for this app with a context provider
import firebase from "firebase/app";
import {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
  User,
} from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, removeValue } from "./storage";
import { UserContext } from "@/context/user";
import { handleAuthError } from "./authErrorResponse";
import * as Google from "expo-auth-session/providers/google";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth hook
export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};

// Create the auth provider component
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInput, setUserInput] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userState, userDispatch } = useContext(UserContext);

  const resetError = () => {
    setError(null);
  };

  // ************************** USE EFFECTS **************************
  useEffect(() => {
    resetError();
  }, [userInput]);

  useEffect(() => {
    getData("@userDetails").then((data) => {
      if (data) {
        setUser(data);
        userDispatch({ type: "ADD_ID", payload: data.uid });
        // signInWithCredential(FIREBASE_AUTH, data)
        //   .then((result) => {
        //     console.log("result", result);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
    });

    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(
      async (user: User | null) => {
        if (user) {
          await AsyncStorage.setItem("@userDetails", JSON.stringify(user));
        }
        setUser(user);
        setUserInput({ email: "", password: "" });
      }
    );

    return () => {
      console.log("unsubscribing");

      unsubscribe();
    };
  }, []);

  // ************************** CREATE ACCOUNT **************************

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLEAUTH_IOS,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLEAUTH_ANDROID,
  });

  const createUserDocument = async (user: any) => {
    try {
      await setDoc(doc(FIREBASE_DB, "users", user.uid), user);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        userInput.email,
        userInput.password
      );
      const user = userCredential.user;

      // Create user document
      createUserDocument({
        ...userState,
        email: user?.email,
        uid: user?.uid,
        data: [],
      });

      // Send email verification
      await sendEmailVerification(user);
    } catch (error: any) {
      const errorMessage = await handleAuthError(error.code);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ************************** SIGN IN **************************

  const signin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        userInput.email,
        userInput.password
      );
    } catch (error: any) {
      const errorMessage = await handleAuthError(error.code);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //not to confident this will work
  const phoneSignIn = async (phoneNumber: string, code: string) => {
    //     const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    //  * const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
    //  * // Obtain a verificationCode from the user.
    //  * const credential = await confirmationResult.confirm(verificationCode);
    // const recaptchaVerifier = useRef(null);
    // const [verificationId, setVerificationId] = useState(null);
    // const sendVerification = () => {
    //   const phoneProvider = new PhoneAuthProvider(FIREBASE_AUTH);
    //   phoneProvider
    //     .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current as any)
    //     .then((data) => setVerificationId(data as any));
    // };
    // const confirmCode = () => {
    //   const credential = PhoneAuthProvider.credential(
    //     verificationId as any,
    //     code
    //   );
    //   signInWithCredential(FIREBASE_AUTH, credential).then((result) => {
    //     console.log(result);
    //   });
    // };
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const googleCredential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, googleCredential)
        .then((result) => {
          createUserDocument({
            ...userState,
            email: result.user.email,
            uid: result.user.uid,
            phoneNumber: result.user.phoneNumber,
            photoURL: result.user.photoURL,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  const signinWithGoogle = async () => {
    //www.youtube.com/watch?v=XB_gNDoOhjY Watch this video to implement google login

    promptAsync();
  };

  // ************************** PASSWORD RESET **************************

  // ************************** SIGN OUT **************************
  const signout = async () => {
    console.log("signing out");
    removeValue("@userDetails");
    setUserInput({ email: "", password: "" });
    setUser(null);
    await FIREBASE_AUTH.signOut();
  };

  const authContextValue: AuthContextType = {
    user,
    userInput,
    setUserInput,
    loading,
    error,
    signup,
    signin,
    signout,
    resetError,
    signinWithGoogle,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a context for the auth hook
interface AuthContextType {
  user: User | null;
  userInput: {
    email: string;
    password: string;
  };
  setUserInput: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  error: string | null;
  loading: boolean;
  signup: () => Promise<void>;
  signin: () => Promise<void>;
  // signinWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
  resetError: () => void;
  signinWithGoogle: () => Promise<void>;
}
