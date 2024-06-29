import { Text } from "@/components/ui/Typography";
import { PageScrollView } from "@/components/ui/Containers";

import Purchases, { PurchasesOffering } from "react-native-purchases";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const Paywall = () => {
  return (
    <PageScrollView>
      <Text>Paywall</Text>
    </PageScrollView>
  );
};

export default Paywall;
