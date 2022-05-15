import { FontAwesome } from "@expo/vector-icons";
import { Flex } from "@react-native-material/core";
import * as React from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { get } from "../../api/get";
import useColorScheme from "../../hooks/useColorScheme";
import { SuperLikeItem } from "./SuperLikeItem";

export interface ISuperLikeListProps {
  navigation: any;
}

export function SuperLikeList({ navigation }: any) {
  const [superLikedNames, setSuperLikedNames] = React.useState(
    [] as { id: string; childName: string }[]
  );
  const [likedNames, setLikedNames] = React.useState(
    [] as { id: string; childName: string }[]
  );
  const [dislikedNames, setDislikedNames] = React.useState(
    [] as { id: string; childName: string }[]
  );
  const [displayedItems, setDisplayedItems] = React.useState(
    [] as { id: string; childName: string }[]
  );
  const [selectedItem, setSelectedItem] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const colorScheme = useColorScheme();
  React.useEffect(() => {
    get(
      "nameAction",
      (res) => {
        const dislikedNames: { id: string; childName: string }[] = [];
        const likedNames: { id: string; childName: string }[] = [];
        const superLikedNames: { id: string; childName: string }[] = [];
        res.data.data.forEach((item: any) => {
          if (item.action === "superlike") {
            superLikedNames.push({ childName: item.name, id: item.id });
          } else if (item.action === "like") {
            likedNames.push({ childName: item.name, id: item.id });
          } else {
            dislikedNames.push({ childName: item.name, id: item.id });
          }
        });
        setDislikedNames(dislikedNames);
        setLikedNames(likedNames);
        setSuperLikedNames(superLikedNames);
        setDisplayedItems(superLikedNames);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleDeleteItem = (item: any) => {
    console.log(item);
  };

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    get(
      "nameAction",
      (res) => {
        const dislikedNames: { id: string; childName: string }[] = [];
        const likedNames: { id: string; childName: string }[] = [];
        const superLikedNames: { id: string; childName: string }[] = [];
        res.data.data.forEach((item: any) => {
          if (item.action === "superlike") {
            superLikedNames.push({ childName: item.name, id: item.id });
          } else if (item.action === "like") {
            likedNames.push({ childName: item.name, id: item.id });
          } else {
            dislikedNames.push({ childName: item.name, id: item.id });
          }
        });
        setDislikedNames(dislikedNames);
        setLikedNames(likedNames);
        setSuperLikedNames(superLikedNames);
        setDisplayedItems(superLikedNames);
        setRefreshing(false);
      },
      (err) => {
        console.log(err);
        setRefreshing(false);
      }
    );
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Flex
        direction="row"
        justify="between"
        items="center"
        style={{ marginVertical: 20, marginHorizontal: 40 }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: selectedItem === 0 ? "green" : "gray",
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => {
            setSelectedItem(0);
            setDisplayedItems(superLikedNames);
          }}
        >
          <FontAwesome
            name="heart"
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

            setDisplayedItems(likedNames);
          }}
        >
          <FontAwesome
            name="thumbs-up"
            size={52}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectedItem === 2 ? "green" : "gray",
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => {
            setSelectedItem(2);
            setDisplayedItems(dislikedNames);
          }}
        >
          <FontAwesome
            name="thumbs-down"
            size={52}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </Flex>
      {displayedItems.map((item: { childName: string; id: string }) => (
        <SuperLikeItem
          key={item.id}
          childName={item.childName}
          id={item.id}
          onDelete={handleDeleteItem}
        />
      ))}
    </ScrollView>
  );
}
