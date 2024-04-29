import { GlobalContext } from "@/context/global";
import { Card, CardContent, Row } from "@/ui/Card";
import { Text, SectionTitle } from "@/ui/Typography";
import React, { useContext } from "react";

type RainInfoProps = {
  totalprecip_in: number;
  totalprecip_mm: number;
  daily_chance_of_rain: number;
};

const RainInfo = ({
  totalprecip_in,
  totalprecip_mm,
  daily_chance_of_rain,
}: RainInfoProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <Card>
      <SectionTitle>Rain Info</SectionTitle>
      <CardContent>
        <Row>
          <Text>Rain Amount:</Text>
          <Text>
            {state.settings.distanceType === 0
              ? `${totalprecip_mm} mm`
              : `${totalprecip_in} inc`}
          </Text>
        </Row>
        <Row>
          <Text>Rain Chance:</Text>

          <Text>{daily_chance_of_rain} %</Text>
        </Row>
      </CardContent>
    </Card>
  );
};

export default RainInfo;
