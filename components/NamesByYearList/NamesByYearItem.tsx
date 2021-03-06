import { AntDesign } from "@expo/vector-icons";
import { Flex } from "@react-native-material/core";
import * as React from "react";
import { Card } from "react-native-paper";
import Navigation from "../../navigation";

export interface INamesByYearItemProps {
  navigation: any;
  year: number;
}

export default function NamesByYearItem(props: INamesByYearItemProps) {
  return (
    <Card
      style={{ margin: 5 }}
      onPress={() =>
        props.navigation.navigate("NamesByYearDetails", {
          year: props.year,
        })
      }
    >
      <Card.Title title={props.year}></Card.Title>
    </Card>
  );
}
