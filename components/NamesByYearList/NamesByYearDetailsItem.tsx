import { Flex } from "@react-native-material/core";
import * as React from "react";
import { Card } from "react-native-paper";
import AppTextDark from "../AppTextDark";

export interface INamesByYearDetailsItemProps {
  name: string;
  numberOfPeople: number;
}

export default function NamesByYearDetailsItem(
  props: INamesByYearDetailsItemProps
) {
  return (
    <Card style={{ margin: 5 }}>
      <Card.Title
        title={props.name}
        right={() => (
          <Flex direction="row">
            <AppTextDark>{props.numberOfPeople.toString()}</AppTextDark>
          </Flex>
        )}
      ></Card.Title>
    </Card>
  );
}
