import * as React from "react";
import { ScrollView } from "react-native";
import NamesByYearItem from "./NamesByYearItem";

export interface INamesByYearListProps {}

export default function NamesByYearList(props: INamesByYearListProps) {
  React.useEffect(() => {}, []);
  return (
    <ScrollView>
      <NamesByYearItem year={2022}></NamesByYearItem>
      <NamesByYearItem year={2021}></NamesByYearItem>
      <NamesByYearItem year={2020}></NamesByYearItem>
      <NamesByYearItem year={2019}></NamesByYearItem>
      <NamesByYearItem year={2018}></NamesByYearItem>
      <NamesByYearItem year={2017}></NamesByYearItem>
      <NamesByYearItem year={2016}></NamesByYearItem>
    </ScrollView>
  );
}
