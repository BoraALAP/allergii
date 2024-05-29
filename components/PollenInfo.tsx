import styled from "styled-components";
import { ScrollView, View } from "react-native";

import { GooglePollenType } from "@/types/api";

import { Text, SectionTitle, Value, Body } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Containers";

import { ValueColor } from "@/func/valueColor";

const Pollen = ({ pollen }: { pollen: GooglePollenType }) => {
  const { plantInfo } = pollen?.dailyInfo[0];

  console.log(pollen);

  const list = plantInfo.filter((item) => item.inSeason === true);

  return (
    <>
      <ScrollViewContainer horizontal showsHorizontalScrollIndicator={false}>
        {list.map((item, index) => {
          return (
            <ItemContainer key={index} index={index} length={list.length}>
              <SectionTitle>{item.displayName}</SectionTitle>
              <Value
                color={ValueColor({
                  value: item.indexInfo.value,
                  type: "pollen",
                })}
              >
                {item.indexInfo.category}
              </Value>
            </ItemContainer>
          );
        })}
      </ScrollViewContainer>
    </>
  );
};

export default Pollen;

export const ScrollViewContainer = styled(ScrollView)`
  width: 100%;
  padding: 0px 16px;
`;

export const ItemContainer = styled(View)<{
  row?: boolean;
  index?: number;
  length?: number;
}>`
  margin-right: ${(props) =>
    props.index !== undefined &&
    props.length !== undefined &&
    props.index < props.length - 1
      ? "16px"
      : "0"};
  gap: -8px;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: ${(props) => (props.row ? "space-between" : "flex-start")};
  min-width: 90px;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.card.border};
`;
