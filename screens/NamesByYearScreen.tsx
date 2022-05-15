import * as React from "react";
import NamesByYearList from "../components/NamesByYearList/NamesByYearList";

export default function NamesByYearScreen({ navigation }: any) {
  return (
    <>
      <NamesByYearList navigation={navigation} />
    </>
  );
}
