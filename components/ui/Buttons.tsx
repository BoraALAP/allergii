import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Text } from "./Typography";
import { Link, router } from "expo-router";

export const PrimaryButton = ({
  title,
  onPress,
  url,
  disabled,
}: {
  title: string;
  onPress?: () => void;
  url?: string;
  disabled?: boolean;
}) => {
  if (!url) {
    return (
      <ButtonContainer onPress={onPress} disabled={disabled}>
        <Text color="invert" center>
          {title}
        </Text>
      </ButtonContainer>
    );
  }
  return (
    <ButtonContainer onPress={() => router.push(url)} disabled={disabled}>
      <Text color="invert" center>
        {title}
      </Text>
    </ButtonContainer>
  );
};

export const SecondaryButton = ({
  title,
  onPress,
  url,
  disabled,
}: {
  title: string;
  onPress?: () => void;
  url?: string;
  disabled?: boolean;
}) => {
  if (!url) {
    return (
      <SecondaryContainer onPress={onPress} disabled={disabled}>
        <Text color={disabled ? "disabled" : "primary"} center>
          {title}
        </Text>
      </SecondaryContainer>
    );
  }
  return (
    <SecondaryContainer
      onPress={() => (url ? router.push(url) : onPress)}
      disabled={disabled}
    >
      <Text color={disabled ? "disabled" : "primary"} center>
        {title}
      </Text>
    </SecondaryContainer>
  );
};

const ButtonStyle = styled(TouchableOpacity)`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.border.radius.button};
  width: 100%;
`;

const ButtonContainer = styled(ButtonStyle)<{ disabled?: boolean }>`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.button.bg.disabled.default
      : props.theme.colors.button.bg.primary.default};
`;

const SecondaryContainer = styled(ButtonStyle)<{ disabled?: boolean }>`
  border: 1px solid
    ${(props) =>
      props.disabled
        ? props.theme.colors.button.border.disabled
        : props.theme.colors.button.border.secondary};
`;
