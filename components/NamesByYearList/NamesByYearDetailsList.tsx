import { Flex } from "@react-native-material/core";
import * as React from "react";
import { View } from "react-native";
import { get } from "../../api/get";

export interface INamesByYearDetailsListProps {}

export default function NamesByYearDetailsList(
  props: INamesByYearDetailsListProps
) {
  React.useEffect(() => {
    get(
      "statistics",
      () => {},
      () => {}
    );
  }, []);

  return (
    <View>
      <Flex justify="center" items="center" direction="row">
        <View style={{ width: "50%" }}></View>
        <View style={{ flex: 1 }}></View>
      </Flex>
    </View>
  );
}
