import { PageView } from "@/components/ui/Containers";

import { PrimaryButton } from "@/components/ui/Buttons";
import { useSubscribed } from "@/func/useSubscribed";

import { Text } from "@/components/ui/Typography";
import RevenueCatUI from "react-native-purchases-ui";
import { global } from "@/constants/Theme";

const NoAccess = () => {
  return (
    <PageView center verticalCenter>
      <Text>Sorry You don't have access to this page</Text>
      <PrimaryButton
        title="Purchase"
        onPress={() =>
          RevenueCatUI.presentPaywall({
            fontFamily: global.font.family.primary,
          })
        }
      />
    </PageView>
  );
};

export default NoAccess;
