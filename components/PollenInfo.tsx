import { GooglePollenType } from "@/types/api";

import { Text, SectionTitle, Value, Body } from "@/ui/Typography";
import React, { useContext } from "react";

import { Card, CardContent, Row } from "@/ui/Card";

import { GlobalContext } from "@/context/global";
import styled from "styled-components";
import { View } from "react-native";
import { Grid } from "@/ui/Containers";
import { ValueColor } from "@/func/valueColor";

const Pollen = ({ pollen }: { pollen: GooglePollenType }) => {
  const { state } = useContext(GlobalContext);

  if (pollen.error !== undefined) {
    return (
      <View>
        <Text>There was an error on our side. We are working on the fix.</Text>
      </View>
    );
  }

  const { plantInfo, pollenTypeInfo } = pollen?.dailyInfo[0];
  const list = plantInfo.filter(
    (item) => item.inSeason === true && item.indexInfo.value > 0
  );

  // write a switch function that takes the keys and turns them in to name of the air quality

  return (
    <Card>
      <Spacing>
        <Grid>
          {list.map((item, index) => {
            return (
              <ItemContainer key={index}>
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
        </Grid>
      </Spacing>
    </Card>
  );
};

export default Pollen;

export const ItemContainer = styled(View)<{ row?: boolean }>`
  gap: -8px;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: ${(props) => (props.row ? "space-between" : "flex-start")};
  min-width: 90px;
  flex: 1;
`;

const Circle = styled(View)<{ level: number }>`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  background-color: ${(props) => {
    if (props.level > 4) {
      return props.theme.colors.level.medium;
    } else if (props.level > 7) {
      return props.theme.colors.level.high;
    } else if (props.level > 10) {
      return props.theme.colors.level.extreme;
    } else {
      return props.theme.colors.level.low;
    }
  }};
  justify-content: center;
  align-items: center;
`;

const Spacing = styled(View)`
  gap: 8px;
  width: 100%;
`;
