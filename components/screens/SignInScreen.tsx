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

//this screen take a function from parent compontent to update a page state
const SignInScreen = ({ setPage }: { setPage: (page: PageState) => void }) => {
  const [disabled, setDisabled] = useState(true);
  const {
    signin,
    user,
    error,
    setUserInput,
    userInput,
    loading,
    resetError,
    signinWithGoogle,
  } = useAuth();

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

  //will be needed when i work on single sign on

  // const auth = FIREBASE_AUTH;
  // const provider = new GoogleAuthProvider();

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId: process.env.EXPO_PUBLIC_APPID,
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;

  //     const googleCredential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, googleCredential)
  //       .then((result) => {
  //         console.log("User signed in!");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [response]);

  return (
    <PageView center verticalCenter>
      <Wrapper>
        <Container>
          <Text>Sign In</Text>
          <Input
            value={userInput.email}
            placeholder="email"
            onChangeText={(value) => handleChange("email", value)}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            style={{ fontFamily: global.font.family.primary }}
          />
          <Input
            //insert name for the input field so that the handleChange function can work
            secureTextEntry
            placeholder="password"
            textContentType="password"
            onChangeText={(value) => handleChange("password", value)}
            value={userInput.password}
            passwordRules={
              "minlength: 8; required: lower; required: upper; required: digit; required: special; required: [-];"
            }
            style={{ fontFamily: global.font.family.primary }}
          />
          {error && <Text>{error}</Text>}
        </Container>
        <Wrapper>
          <PrimaryButton
            title="Log in"
            onPress={async () => {
              signin();
            }}
            disabled={disabled}
          />

          <PrimaryButton
            title="Sign In with Google"
            onPress={() => signinWithGoogle()}
          />
          <DividerH />
          <Container>
            <SecondaryButton
              title="Forgot Password"
              onPress={() => {
                resetError();
                setPage("forgot");
              }}
            />
            <SecondaryButton
              title="Create an Account"
              onPress={() => {
                resetError();
                setPage("signup");
              }}
            />
          </Container>
        </Wrapper>
      </Wrapper>
      <LoadingOverlay visible={loading} />
    </PageView>
  );
};

export default SignInScreen;

const Container = styled(View)`
  gap: 16px;
  width: 100%;
`;

const Wrapper = styled(View)`
  gap: 32px;
  width: 100%;
`;
