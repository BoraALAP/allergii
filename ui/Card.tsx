import { View, View as ViewBase } from "react-native";
import styled from "styled-components";
import { SectionTitle } from "./Typography";

type CardProps = {
  children: React.ReactNode;
  otherProps?: any;
};

type CardScrollProps = {
  children: React.ReactNode;
  title?: string;
};

// export const Card = ({ children, otherProps }: CardProps) => {
//   return <CardContainer {...otherProps}>{children}</CardContainer>;
// };
// export const CardContent = ({ children, otherProps }: CardProps) => {
//   return (
//     <CardContentContainer {...otherProps}>{children}</CardContentContainer>
//   );
// };
// export const Row = ({ children, otherProps }: CardProps) => {
//   return <RowContainer {...otherProps}>{children}</RowContainer>;
// };

export const Card = styled(ViewBase)<{ row?: boolean; noPadding?: boolean }>`
  padding: ${(props) => (props.noPadding ? "0px" : "0 16px")};
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  align-items: center;
  gap: 24px;
  width: 100%;
`;

export const CardContent = styled(ViewBase)`
  display: flex;
`;

export const Row = styled(ViewBase)`
  flex-direction: row;
  /* justify-content: space-between; */
  gap: 8px;
  align-items: center;
  width: auto;
  flex: 1;
`;
