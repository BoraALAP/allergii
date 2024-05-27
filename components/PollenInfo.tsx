import styled from "styled-components";
import { View } from "react-native";

import { GooglePollenType } from "@/types/api";

import { Text, SectionTitle, Value, Body } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Containers";

import { ValueColor } from "@/func/valueColor";

const Pollen = ({ pollen }: { pollen: GooglePollenType }) => {
  const { plantInfo } = pollen?.dailyInfo[0];
  const list = plantInfo.filter(
    (item) => item.inSeason === true && item.indexInfo.value > 0
  );

  if (pollen.error !== undefined || pollen === undefined) {
    return (
      <View>
        <Text>There was an error on our side. We are working on the fix.</Text>
      </View>
    );
  }

  // write a switch function that takes the keys and turns them in to name of the air quality

  return (
    <Card>
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
    </Card>
  );
};

export default Pollen;

export const ItemContainer = styled(View)<{ row?: boolean }>`
  gap: -8px;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: ${(props) => (props.row ? "space-between" : "flex-start")};
  min-width: 90px;
`;
