import { AntDesign } from "@expo/vector-icons";
import { Flex } from "@react-native-material/core";
import * as React from "react";
import { Card } from "react-native-paper";
import Navigation from "../../navigation";

export interface INamesByYearItemProps {
  year: number;
}

export default function NamesByYearItem(
  props: INamesByYearItemProps,
  { navigation }: any
) {
  return (
    <Card
      style={{ margin: 5 }}
      onPress={() => props.navigation.navigate("NamesByYearDetailsItem")}
    >
      <Card.Title title={props.year}></Card.Title>
    </Card>
  );
}
