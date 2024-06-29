import { useEffect, useState } from "react";
import Purchases, { CustomerInfo } from "react-native-purchases";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

export const useSubscribed = () => {
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();

  const CheckSubscriptionStatus = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();

      setCustomerInfo(customerInfo);

      // const isActive = customerInfo.entitlements.active["your_entitlement_id"] !== undefined;
      // setIsSubscribed(isActive);
    } catch (error) {
      console.error("Error fetching customer info", error);
    }
    return;
  };

  const Display = async () => {
    RevenueCatUI.Paywall({});
  };

  const CheckPaywall = async () => {
    setLoading(true);
    try {
      const paywallResult: PAYWALL_RESULT =
        await RevenueCatUI.presentPaywallIfNeeded({
          // Present paywall for current offering:
          requiredEntitlementIdentifier: "pro",
        });

      switch (paywallResult) {
        case PAYWALL_RESULT.PURCHASED:
        case PAYWALL_RESULT.RESTORED:
        case PAYWALL_RESULT.NOT_PRESENTED:
          setSubscribed(true);
          return true;
        case PAYWALL_RESULT.CANCELLED:
        case PAYWALL_RESULT.ERROR:
          setSubscribed(false);
          return false;
        default:
          setSubscribed(false);
          return false;
      }
    } catch (error) {
      console.error("Error checking paywall", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CheckSubscriptionStatus();
  }, []);

  return {
    loading,
    subscribed,
    customerInfo,
    CheckPaywall,
    Display,
  };
};
