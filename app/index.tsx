import { Redirect } from "expo-router";
import React from "react";
import styled from "styled-components";

const index = () => {
  return <Redirect href="/(tabs)/now" />;
};

export default index;
