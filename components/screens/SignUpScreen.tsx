import { PageScrollView, PageView } from "@/components/ui/Containers";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { useAuth } from "@/func/useAuth";

import { useContext, useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components";

import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { UserContext } from "@/context/user";
import { DividerH } from "../ui/Elements";
import { global } from "@/constants/Theme";
import { Text } from "../ui/Typography";
import { PageState } from "./AuthNavigator";
import LoadingOverlay from "../ui/LoadingOverlay";
import { Input } from "../ui/Input";

const SignUpScreen = ({ setPage }: { setPage: (page: PageState) => void }) => {
  const [disabled, setDisabled] = useState(true);
  const { signup, user, error, setUserInput, userInput, loading, resetError } =
    useAuth();

  useEffect(() => {
    if (user) {
      router.back();
    }
  }, [user]);

  useEffect(() => {
    if (
      userInput.email === "" ||
      userInput.password === "" ||
      userInput.password.length < 8
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userInput]);

  const handleChange = (name: string, value: string) => {
    const newValue = name === "email" ? value.toLowerCase() : value;
    setUserInput((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <PageView center verticalCenter>
      <Wrapper>
        <Container>
          <Text>Sign Up</Text>
          <Input
            placeholder="email"
            value={userInput.email}
            onChangeText={(value: any) => handleChange("email", value)}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
          <Input
            //insert name for the input field so that the handleChange function can work
            secureTextEntry
            placeholder="password"
            value={userInput.password}
            textContentType="password"
            onChangeText={(value: any) => handleChange("password", value)}
            passwordRules={
              "minlength: 8; required: lower; required: upper; required: digit; required: special; required: [-];"
            }
          />

          {error && <Text>{error}</Text>}
        </Container>
        <Wrapper>
          <PrimaryButton
            title="Create an Account"
            onPress={async () => {
              signup();
            }}
            disabled={disabled}
          />
          <DividerH />
          <SecondaryButton
            title="Log In"
            onPress={() => {
              resetError();
              setPage("signin");
            }}
          />
        </Wrapper>
      </Wrapper>
      <LoadingOverlay visible={loading} />
    </PageView>
  );
};

export default SignUpScreen;

const Container = styled(View)`
  gap: 16px;
  width: 100%;
`;

const Wrapper = styled(View)`
  gap: 32px;
  width: 100%;
`;
