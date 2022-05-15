import { StyleSheet, AppRegistry, Text, View, Button } from "react-native";
import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";

import {} from "../components/Themed";
import Swiper from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";
import { create } from "../api/create";
import { get } from "../api/get";
import { Checkbox, RadioButton, Snackbar } from "react-native-paper";
import AppLabel from "../components/AppLabel";
import AppText from "../components/AppText";
import AppTextDark from "../components/AppTextDark";
import { Flex } from "@react-native-material/core";

export default function Home() {
  const swiperRef = React.useRef(null);
  const [random, setRandom] = React.useState(false);
  const [swiped, setSwiped] = React.useState(0);
  const [checked, setChecked] = React.useState(false);

  const [cards, setCards] = React.useState<Array<string>>([]);
  const [allNames, setNames] = React.useState<
    Array<{ babyName: string; key: string }>
  >([{ babyName: "", key: "" }]);
  const [swipedIndex, setSwipedIndex] = React.useState<number>(0);

  useFocusEffect(
    React.useCallback(() => {
      random ? getNewRandomName() : suggestNewName();
      swiperRef.current.swipeLeft();
    }, [])
  );

  React.useEffect(() => {
    setRandom(checked);
  }, [checked]);

  const getNewRandomName = React.useCallback(() => {
    console.log("Nakljucno");
    get(
      "getRandomName",
      (res) => {
        console.log(res.data);
        setCards((cards) => [...cards, res.data.name]);
        setNames((names) => [
          ...names,
          { babyName: res.data.name, key: res.data.name_ID },
        ]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const suggestNewName = React.useCallback(() => {
    get(
      "getSuggestedName",
      (res) => {
        //console.log(res.data);
        setCards((cards) => [...cards, res.data.name]);
        setNames((names) => [
          ...names,
          { babyName: res.data.name, key: res.data.name_ID },
        ]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const dislikeName = () => {
    setSwipedIndex(swipedIndex + 1);
    if (allNames[swiped].key != "") {
      create(
        "nameAction",
        { action: "dislike", name: allNames[swiped].key },
        (res) => {
          //console.log(res);
          console.log("dislike");
        },
        (err) => {}
      );
    }
  };

  const likeName = () => {
    setSwipedIndex(swipedIndex + 1);
    //console.log(allNames);
    if (allNames[swiped].babyName != "") {
      create(
        "nameAction",
        {
          action: "like",
          name: allNames[swiped].key,
        },
        (res) => {
          console.log(allNames[swipedIndex]);
          console.log("like");
        },
        (err) => {}
      );
    }
  };

  const superlikeName = () => {
    setSwipedIndex(swipedIndex + 1);
    if (allNames[swiped].babyName != "") {
      create(
        "nameAction",
        { action: "superlike", name: allNames[swiped].key },
        (res) => {
          console.log("superlike");
        },
        (err) => {}
      );
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5FCFF",
      color: "black",
    },
    card: {
      margin: 30,
      height: "50%",
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white",
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent",
    },
    buttonContainer: {
      flexDirection: "row",
      alignSelf: "center",
    },
    buttonRounded: {
      borderRadius: 900,
      margin: 10,
      padding: 10,
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "center",
    },
    center: {
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
    },
    red: {
      backgroundColor: "#FAA0A0",
      justifyContent: "center",
      alignContent: "center",
      padding: 30,
      paddingLeft: 35,
    },
    green: {
      backgroundColor: "#DAF7A6",
      justifyContent: "center",
      alignContent: "center",
      padding: 30,
      paddingLeft: 35,
    },
    heart: {
      backgroundColor: "#FCEF91",
      justifyContent: "center",
      alignContent: "center",
      padding: 30,
      paddingLeft: 35,
    },
    paddingManual: {
      padding: 30,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Swiper
          ref={swiperRef}
          cards={cards}
          renderCard={(card, index) => {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{cards[index - 1]}</Text>
              </View>
            );
          }}
          onSwiped={(cardIndex) => {
            setSwipedIndex(cardIndex);
            setSwiped(swiped + 1);
            console.log(cardIndex);
            random ? getNewRandomName() : suggestNewName();
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          cardIndex={swipedIndex}
          backgroundColor={"#FCEF91"}
          stackSize={3}
          onSwipedLeft={dislikeName}
          onSwipedRight={likeName}
          onSwipedTop={superlikeName}
        ></Swiper>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRounded}>
          <AntDesign.Button
            name="close"
            size={24}
            style={styles.red}
            color="white"
            onPress={() => swiperRef.current.swipeLeft()}
          />
        </View>
        <View style={styles.buttonRounded}>
          <AntDesign.Button
            name="hearto"
            style={styles.heart}
            onPress={() => swiperRef.current.swipeTop()}
            size={24}
            color="white"
          />
        </View>
        <View style={styles.buttonRounded}>
          <AntDesign.Button
            name="check"
            size={24}
            style={(styles.mainButtons, styles.green)}
            color="white"
            onPress={() => swiperRef.current.swipeRight()}
          ></AntDesign.Button>
        </View>
      </View>

      <Flex justify="center" items="center">
        <AppTextDark>Želim popolnoma naključno generacijo</AppTextDark>
        <Checkbox
          color="#FCEF91"
          uncheckedColor="#FCEF91"
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </Flex>
    </View>
  );
}
