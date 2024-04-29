import { PageView, View } from "@/ui/Containers";
import { Text, SectionTitle } from "@/ui/Typography";
import styled from "styled-components";

export const NoPermission = () => {
  return (
    <PageView>
      <SectionTitle center>
        You didn't provide the necessary permission
      </SectionTitle>
      <ViewStyle>
        <Text>1. Go to settings and enable the necessary permissions</Text>
        <Text>2. Restart the app</Text>
      </ViewStyle>
    </PageView>
  );
};

const ViewStyle = styled(View)`
  margin-top: 24px;
  gap: 16px;
`;
