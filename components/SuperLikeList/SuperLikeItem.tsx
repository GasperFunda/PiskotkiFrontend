import { AntDesign } from "@expo/vector-icons";
import { Flex } from "@react-native-material/core";
import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";

export interface ISuperLikeItemProps {
  childName: string;
}

export function SuperLikeItem(props: ISuperLikeItemProps) {
  return (
    <Card style={{ margin: 5 }}>
      <Card.Title
        title={props.childName}
        right={(props) => (
          <Flex direction="row">
            <AntDesign name="checkcircle" size={24} color="black" />
            <AntDesign
              name="delete"
              size={24}
              color="black"
              style={{ marginHorizontal: 10 }}
            />
          </Flex>
        )}
      ></Card.Title>
    </Card>
  );
}
