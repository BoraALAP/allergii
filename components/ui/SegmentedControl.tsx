import { global } from "@/constants/Theme";
import { GlobalContext } from "@/context/global";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useContext } from "react";

type SegmentedControlProps = {
  values: string[];
  selectedIndex: number;
  onChange: (result: number) => void;
};

export const SegmentedControlComponent = ({
  onChange,
  selectedIndex,
  values,
}: SegmentedControlProps) => {
  const { state } = useContext(GlobalContext);

  return (
    <SegmentedControl
      values={values}
      selectedIndex={selectedIndex}
      onChange={(event) => {
        onChange(event.nativeEvent.selectedSegmentIndex);
      }}
      fontStyle={{ fontFamily: global.font.family.primary, fontSize: 14 }}
      activeFontStyle={{
        fontFamily: global.font.family.primaryBold,
        fontSize: 14,
      }}
      style={{ width: "100%" }}
      appearance={state.dark ? "dark" : "light"}
    />
  );
};
