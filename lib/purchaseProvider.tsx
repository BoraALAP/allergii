import React, { PropsWithChildren, useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, { PurchasesOffering } from "react-native-purchases";

const PurchaseProvider = ({ children }: PropsWithChildren) => {
  // const [currentOffering, setCurrentOffering] =
  //   useState<PurchasesOffering | null>(null);

  useEffect(() => {
    const setup = async () => {
      const apiKey =
        Platform.OS === "android"
          ? (process.env.EXPO_PUBLIC_REVENUECATANDROID as string)
          : (process.env.EXPO_PUBLIC_REVENUECATIOS as string);

      try {
        await Purchases.configure({
          apiKey,
        });
        Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
        const offerings = await Purchases.getOfferings();

        // setCurrentOffering(offerings.current);
      } catch (error) {
        console.error("RevenueCat setup error", error);
      }
    };

    setup().catch((error) => console.error("RevenueCat setup error", error));
  }, []);

  // console.log("offerings", currentOffering);

  return <>{children}</>;
};

export default PurchaseProvider;
