import { Flex } from "@react-native-material/core";
import * as React from "react";
import { Card } from "react-native-paper";
import AppText from "../AppText";

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
            <AppText>{props.numberOfPeople.toString()}</AppText>
          </Flex>
        )}
      ></Card.Title>
    </Card>
  );
}
