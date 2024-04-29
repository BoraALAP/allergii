import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

export const PrimaryButtons = ({
  href,
  label,
  ...otherProps
}: {
  href: any;
  label: string;
}) => {
  return (
    <TouchOpacity onPress={() => router.push(href)} {...otherProps}>
      <TextStyle>{label}</TextStyle>
    </TouchOpacity>
  );
};

const TouchOpacity = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.button.bg.primary};
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.border.radius.button};
  display: flex;
  align-items: center;
`;

const TextStyle = styled(Text)`
  color: ${({ theme }) => theme.colors.button.text.primary};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;
