import { Text } from "@/components/ui/Typography";
import { View } from "react-native";
import styled from "styled-components";

export const TextLabel = styled(Text)<{ feelLike?: boolean }>`
  font-family: ${(props) => props.theme.font.family.primaryBold};
  font-size: ${(props) =>
    props.feelLike ? props.theme.font.size.sm : props.theme.font.size.base};
`;

export const BottomLabel = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const CustomDataPoint = (props: any) => {
  return (
    <Dot>
      <InnerDot />
    </Dot>
  );
};

const Dot = styled(View)`
  width: 8px;
  height: 8px;
  padding: 2px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.invert};
  margin-top: -4px;
`;

const InnerDot = styled(View)`
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;
