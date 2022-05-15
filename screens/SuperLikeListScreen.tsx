import * as React from "react";
import { SuperLikeList } from "../components/SuperLikeList/SuperLikeList";

export function SuperLikeListScreen({ navigation }: any) {
  return (
    <>
      <SuperLikeList navigation={navigation} />
    </>
  );
}
