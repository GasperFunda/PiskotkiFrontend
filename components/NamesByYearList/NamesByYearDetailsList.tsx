import { FontAwesome } from "@expo/vector-icons";
import { Flex } from "@react-native-material/core";
import * as React from "react";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { get } from "../../api/get";
import AppHeading from "../AppHeading";
import NamesByYearDetailsItem from "./NamesByYearDetailsItem";

export default function NamesByYearDetailsList({ route, navigation }: any) {
  const { year } = route.params;
  const colorScheme = useColorScheme();
  const [selectedItem, setSelectedItem] = React.useState(0);

  return (
    <ScrollView>
      <AppHeading fontSize={24}>{year.toString()}</AppHeading>
      <Flex
        direction="row"
        justify="between"
        items="center"
        style={{ marginVertical: 20, marginHorizontal: 80 }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: selectedItem === 0 ? "green" : "gray",
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => {
            setSelectedItem(0);
          }}
        >
          <FontAwesome
            name="male"
            size={52}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectedItem === 1 ? "green" : "gray",
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => {
            setSelectedItem(1);
          }}
        >
          <FontAwesome
            name="female"
            size={52}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </Flex>

      {selectedItem === 0 ? (
        <>
          <NamesByYearDetailsItem name={"Franc"} numberOfPeople={22093} />
          <NamesByYearDetailsItem name={"Janez"} numberOfPeople={19958} />
          <NamesByYearDetailsItem name={"Marko"} numberOfPeople={17286} />
          <NamesByYearDetailsItem name={"Andrej"} numberOfPeople={16564} />
          <NamesByYearDetailsItem name={"Jožef"} numberOfPeople={14127} />
        </>
      ) : (
        <>
          <NamesByYearDetailsItem name={"Marija"} numberOfPeople={51751} />
          <NamesByYearDetailsItem name={"Nika"} numberOfPeople={32775} />
          <NamesByYearDetailsItem name={"Ana"} numberOfPeople={24605} />
          <NamesByYearDetailsItem name={"Marjana"} numberOfPeople={23478} />
          <NamesByYearDetailsItem name={"Zofka"} numberOfPeople={20091} />
        </>
      )}
    </ScrollView>
  );
}
