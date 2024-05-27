import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Text } from "./Typography";

export const Button = ({
  title,
  onPress,
  active,
}: {
  title: string;
  active?: boolean;
  onPress: () => void;
}) => {
  return (
    <ButtonContainer onPress={onPress} active={active}>
      <Text color="invert">{title}</Text>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active
      ? props.theme.colors.button.bg.primary.active
      : props.theme.colors.button.bg.primary.default};
  padding: 4px 16px;
  border-radius: ${({ theme }) => theme.border.radius.button};
`;
