import * as React from "react";
import { ScrollView } from "react-native";
import { SuperLikeItem } from "./SuperLikeItem";

export interface ISuperLikeListProps {}

export function SuperLikeList(props: ISuperLikeListProps) {
  return (
    <ScrollView>
      <SuperLikeItem childName="Franci"></SuperLikeItem>
      <SuperLikeItem childName="Franci"></SuperLikeItem>
      <SuperLikeItem childName="Franci"></SuperLikeItem>
    </ScrollView>
  );
}
