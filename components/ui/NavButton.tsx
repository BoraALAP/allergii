import { router } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Text } from "./Typography";
import { ChevronRight } from "@/assets/icons/chevron";
import { GlobalContext } from "@/context/global";
import { ColorType, dark, light } from "@/constants/Theme";

type NavButtonProps = {
  url: string;
  title: string;
};

export const NavButton = ({ url, title }: NavButtonProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <Button onPress={() => router.push(url)}>
      <Text>{title}</Text>
      <ChevronRight
        color={state.dark ? dark.colors.primary : light.colors.primary}
      />
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.button.border.nav};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
