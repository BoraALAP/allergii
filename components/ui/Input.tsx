import { dark, global, light } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import { useContext } from "react";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components";

type InputProps = TextInputProps & {
  onChangeText: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  onChangeText,
  ...props
}: InputProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <Container
      onChangeText={(value) => onChangeText(value)}
      placeholderTextColor={
        state.dark === true
          ? dark.colors.input.placeholder
          : light.colors.input.placeholder
      }
      {...props}
    />
  );
};

export const Container = styled(TextInput)`
  border-color: ${({ theme }) => theme.colors.input.border};
  color: ${({ theme }) => theme.colors.primary};
  border-width: 1px;
  padding: 12px 16px;
  width: 100%;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.font.family.primary};
`;
