import { GlobalContext } from "@/context/global";
import { weatherContidion } from "@/func/condition";
import { Card, CardContent, Row } from "@/ui/Card";
import { Text, SectionTitle } from "@/ui/Typography";
import React, { useContext } from "react";
import { Image } from "react-native";

type RealTimeProps = {
  condition: {
    code: number;
    text: string;
    icon: string;
  };
  uv: number;
  avghumidity: number;
};

const RealTime = ({ condition, uv, avghumidity }: RealTimeProps) => {
  const { state } = useContext(GlobalContext);

  //if I use my own icons i can use this function
  // const weather = weatherContidion(code);
  return (
    <Card>
      <SectionTitle>Info</SectionTitle>
      <CardContent>
        <Row>
          <Text>Average Humidity:</Text>
          <Text>{avghumidity}%</Text>
        </Row>
        <Row>
          <Text>UV Index</Text>
          <Text>{uv}</Text>
        </Row>
        <Row>
          <Text>{condition.text}</Text>
          <Image
            source={{ uri: `https:${condition.icon}` }}
            style={{ width: 64, height: 64 }}
          />
        </Row>
      </CardContent>
    </Card>
  );
};

export default RealTime;
