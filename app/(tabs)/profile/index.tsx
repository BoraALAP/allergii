import { useContext, useEffect } from "react";
import * as Updates from "expo-updates";
import styled from "styled-components";

import { GlobalContext } from "../../../context/global";
import { storeData } from "../../../func/storage";

import { Caption, Text } from "@/components/ui/Typography";
import { PageScrollView, View } from "@/components/ui/Containers";

import { NavButton } from "@/components/ui/NavButton";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { useAuth } from "@/func/useAuth";
import { UserContext } from "@/context/user";

const Profile = () => {
  const { currentlyRunning } = Updates.useUpdates();
  const { signin, loading, user, signout } = useAuth();

  const updateId = Updates.updateId;

  return (
    <PageScrollView>
      <UserCard>
        {user ? (
          <>
            <Text>Welcome, {user.email}</Text>
          </>
        ) : (
          <>
            <PrimaryButton
              url="/(tabs)/profile/(auth)/signin"
              title="Sign In"
            />
          </>
        )}
      </UserCard>
      <NavButton url="/(tabs)/profile/settings" title="Settings" />
      {user && <SecondaryButton title="Logout" onPress={() => signout()} />}
      <Container>
        <Caption color="soft">
          {currentlyRunning.isEmbeddedLaunch
            ? "This app is running from built-in code"
            : "This app is running an update"}
        </Caption>
        <Caption color="soft">
          Build version: {currentlyRunning.runtimeVersion}
        </Caption>
        {updateId && <Caption color="soft">Update ID: {updateId}</Caption>}
      </Container>
    </PageScrollView>
  );
};

const UserCard = styled(View)`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.card.background};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
  margin-top: 16px;
  gap: 16px;
`;

const Container = styled(View)`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.card.background};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  elevation: 4;
  margin-top: 16px;
  align-items: center;
`;

export default Profile;
