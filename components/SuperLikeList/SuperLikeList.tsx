import { FontAwesome } from "@expo/vector-icons";
import { Flex } from "@react-native-material/core";
import * as React from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { remove } from "../../api/delete";
import { get } from "../../api/get";
import useColorScheme from "../../hooks/useColorScheme";
import { SuperLikeItem } from "./SuperLikeItem";

export interface ISuperLikeListProps {
  navigation: any;
}

export function SuperLikeList({ navigation }: any) {
  const [superLikedNames, setSuperLikedNames] = React.useState(
    [] as { name_ID: string; childName: string }[]
  );
  const [likedNames, setLikedNames] = React.useState(
    [] as { name_ID: string; childName: string }[]
  );
  const [dislikedNames, setDislikedNames] = React.useState(
    [] as { name_ID: string; childName: string }[]
  );
  const [displayedItems, setDisplayedItems] = React.useState(
    [] as { name_ID: string; childName: string }[]
  );
  const [selectedItem, setSelectedItem] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const colorScheme = useColorScheme();
  React.useEffect(() => {
    get(
      "nameAction",
      (res) => {
        const dislikedNames: { name_ID: string; childName: string }[] = [];
        const likedNames: { name_ID: string; childName: string }[] = [];
        const superLikedNames: { name_ID: string; childName: string }[] = [];
        res.data.data.forEach((item: any) => {
          if (item.action === "superlike") {
            superLikedNames.push({
              childName: item.name,
              name_ID: item.name_ID,
            });
          } else if (item.action === "like") {
            likedNames.push({ childName: item.name, name_ID: item.name_ID });
          } else {
            dislikedNames.push({ childName: item.name, name_ID: item.name_ID });
          }
        });
        setDislikedNames(dislikedNames);
        setLikedNames(likedNames);
        setSuperLikedNames(superLikedNames);
        setDisplayedItems(superLikedNames);
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleDeleteItem = (item: any) => {
    remove(
      "nameAction?name=" + item,
      (res) => {
        setSnackbarVisible(true);
        setSuperLikedNames(superLikedNames.filter((i) => i.name_ID !== item));
        setLikedNames(likedNames.filter((i) => i.name_ID !== item));
        setDislikedNames(dislikedNames.filter((i) => i.name_ID !== item));
        setDisplayedItems(displayedItems.filter((i) => i.name_ID !== item));
      },
      (err) => {
        console.log(err.response?.data);
      }
    );
  };

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    get(
      "nameAction",
      (res) => {
        const dislikedNames: { name_ID: string; childName: string }[] = [];
        const likedNames: { name_ID: string; childName: string }[] = [];
        const superLikedNames: { name_ID: string; childName: string }[] = [];
        res.data.data.forEach((item: any) => {
          if (item.action === "superlike") {
            superLikedNames.push({
              childName: item.name,
              name_ID: item.name_ID,
            });
          } else if (item.action === "like") {
            likedNames.push({ childName: item.name, name_ID: item.name_ID });
          } else {
            dislikedNames.push({ childName: item.name, name_ID: item.name_ID });
          }
        });
        setDislikedNames(dislikedNames);
        setLikedNames(likedNames);
        setSuperLikedNames(superLikedNames);
        if (selectedItem === 0) {
          setDisplayedItems(superLikedNames);
        }
        if (selectedItem === 1) {
          setDisplayedItems(likedNames);
        }
        if (selectedItem === 2) {
          setDisplayedItems(dislikedNames);
        }
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
      {displayedItems.map((item: { childName: string; name_ID: string }) => (
        <SuperLikeItem
          key={item.name_ID}
          childName={item.childName}
          id={item.name_ID}
          onDelete={handleDeleteItem}
        />
      ))}
      <Snackbar
        onDismiss={() => setSnackbarVisible(false)}
        visible={snackbarVisible}
        duration={2000}
      >
        Uspešno ste izbrisali ime!
      </Snackbar>
    </ScrollView>
  );
}
