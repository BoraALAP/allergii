import { PageScrollView } from "@/components/ui/Containers";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { useAuth } from "@/func/useAuth";

import { useContext, useEffect, useState } from "react";
import { TextInput } from "react-native";
import styled from "styled-components";

import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { UserContext } from "@/context/user";
import AuthNavigator from "@/components/screens/AuthNavigator";

const Signin = () => {
  return <AuthNavigator />;
};

export default Signin;

const Input = styled(TextInput)`
  border: 1px solid black;
  padding: 12px 16px;
  width: 100%;
  border-radius: 4px;
`;
