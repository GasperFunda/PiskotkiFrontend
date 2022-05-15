import * as React from "react";
import { ScrollView } from "react-native";
import { get } from "../../api/get";
import NamesByYearItem from "./NamesByYearItem";

export default function NamesByYearList({ navigation }: any) {
  return (
    <ScrollView>
      <NamesByYearItem navigation={navigation} year={2022}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2021}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2020}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2019}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2018}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2017}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2016}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2015}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2014}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2013}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2012}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2011}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2010}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2009}></NamesByYearItem>
      <NamesByYearItem navigation={navigation} year={2008}></NamesByYearItem>
    </ScrollView>
  );
}
