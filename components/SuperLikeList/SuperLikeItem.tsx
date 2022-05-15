import { AntDesign } from "@expo/vector-icons";
import { Flex } from "@react-native-material/core";
import * as React from "react";
import { Card } from "react-native-paper";

export interface ISuperLikeItemProps {
  childName: string;
  id: string;
  onDelete: (items: any) => void;
}

export function SuperLikeItem(props: ISuperLikeItemProps) {
  return (
    <Card style={{ margin: 5 }}>
      <Card.Title
        title={props.childName}
        right={() => (
          <Flex direction="row">
            <AntDesign name="checkcircle" size={24} color="black" />
            <AntDesign
              name="delete"
              size={24}
              color="black"
              onPress={() => props.onDelete(props.id)}
              style={{ marginHorizontal: 10 }}
            />
          </Flex>
        )}
      ></Card.Title>
    </Card>
  );
}
