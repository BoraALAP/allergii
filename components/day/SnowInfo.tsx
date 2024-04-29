import { GlobalContext } from "@/context/global";
import { Card, CardContent, Row } from "@/ui/Card";
import { Text, SectionTitle } from "@/ui/Typography";
import React, { useContext } from "react";

type SnowInfoProps = {
  daily_chance_of_snow: number;
  totalsnow_cm: number;
};

const SnowInfo = ({ daily_chance_of_snow, totalsnow_cm }: SnowInfoProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <Card>
      <SectionTitle>Snow Info</SectionTitle>
      <CardContent>
        <Row>
          <Text>Snow Chance:</Text>
          <Text>{daily_chance_of_snow}%</Text>
        </Row>

        <Row>
          <Text>Snow Amount</Text>
          <Text>
            {state.settings.distanceType === 0
              ? `${totalsnow_cm} cm`
              : `${(totalsnow_cm * 0.393701).toFixed(2)} inc`}
          </Text>
        </Row>
      </CardContent>
    </Card>
  );
};

export default SnowInfo;
