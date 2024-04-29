import { GlobalContext } from "@/context/global";
import { Card, CardContent, Row } from "@/ui/Card";
import { Text, SectionTitle } from "@/ui/Typography";
import React, { useContext } from "react";

type WindInfoProps = {
  maxwind_kph?: number;
  maxwind_mph?: number;

  avgvis_km?: number;
  avgvis_miles?: number;
};

const WindInfo = ({
  maxwind_kph,
  maxwind_mph,
  avgvis_km,
  avgvis_miles,
}: WindInfoProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <Card>
      <SectionTitle>Wind Info</SectionTitle>
      <CardContent>
        <Row>
          <Text>Max Wind Speed:</Text>
          <Text>
            {state.settings.distanceType === 0
              ? `${maxwind_kph} km/h`
              : `${maxwind_mph} m/h`}
          </Text>
        </Row>

        <Row>
          <Text>Average Visibility:</Text>
          <Text>
            {state.settings.distanceType === 0
              ? `${avgvis_km} km`
              : `${avgvis_miles} miles`}
          </Text>
        </Row>
      </CardContent>
    </Card>
  );
};

export default WindInfo;
