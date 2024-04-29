import { GlobalContext } from "@/context/global";
import { Card, CardContent, Row } from "@/ui/Card";
import { Text, SectionTitle } from "@/ui/Typography";
import React, { useContext } from "react";

type TempInfoProps = {
  avgtemp_c: number;
  avgtemp_f: number;

  maxtemp_c: number;
  maxtemp_f: number;

  mintemp_c: number;
  mintemp_f: number;
};

const TempInfo = ({
  avgtemp_c,
  avgtemp_f,
  maxtemp_c,
  maxtemp_f,
  mintemp_c,
  mintemp_f,
}: TempInfoProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <Card>
      <SectionTitle>Temp Info</SectionTitle>
      <CardContent>
        <>
          <Row>
            <Text>Minimum:</Text>
            <Text>
              {state.settings.tempType === 0
                ? `${mintemp_c} °C`
                : `${mintemp_f} °F`}
            </Text>
          </Row>
          <Row>
            <Text>Average:</Text>
            <Text>
              {state.settings.tempType === 0
                ? `${avgtemp_c} °C`
                : `${avgtemp_f} °F`}
            </Text>
          </Row>
          <Row>
            <Text>Maximum:</Text>
            <Text>
              {state.settings.tempType === 0
                ? `${maxtemp_c} °C`
                : `${maxtemp_f} °F`}
            </Text>
          </Row>
        </>
      </CardContent>
    </Card>
  );
};

export default TempInfo;
