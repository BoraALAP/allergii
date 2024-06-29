import SliderComponent from "@react-native-community/slider";
import styled from "styled-components";
import { SectionTitle } from "./Typography";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalContext } from "@/context/global";
import { useContext } from "react";
import { dark, light } from "@/constants/Theme";

interface SliderProps {
  onValueChange: (value: number) => void;
  value: number;
  title: string;
}

export const Slider = ({ onValueChange, value, title }: SliderProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <SliderWrapper>
      <SectionTitle>{title}</SectionTitle>
      <ViewWrapper>
        <SliderComponentStyle
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={value === undefined ? 0 : value}
          onValueChange={onValueChange}
          minimumTrackTintColor={
            state.dark ? dark.colors.slider.track : light.colors.slider.track
          }
          maximumTrackTintColor={
            state.dark ? dark.colors.slider.base : light.colors.slider.base
          }
          thumbTintColor={
            state.dark ? dark.colors.slider.thumb : light.colors.slider.thumb
          }
        />
        <Numbers>
          <Num>0</Num>
          <Num>5</Num>
          <Num>10</Num>
        </Numbers>
      </ViewWrapper>
    </SliderWrapper>
  );
};

const SliderComponentStyle = styled(SliderComponent)`
  width: 100%;
`;

const SliderWrapper = styled(View)`
  gap: 8px;
  width: 100%;
`;

const ViewWrapper = styled(View)`
  width: 100%;
`;

const Numbers = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 8px;
`;
const Num = styled(SectionTitle)`
  width: 16px;
  text-align: center;
`;
