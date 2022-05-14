import { StyleSheet, AppRegistry, Text, View } from "react-native";

import {} from "../components/Themed";
import Swiper from "react-native-web-swiper";
import { SwiperCard } from "../components/SwiperCard";

export default function HomeScreen() {
  const styles = StyleSheet.create({
    container: {
      height: "65%",
    },
    slideContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    slide: { backgroundColor: "rgba(255, 204, 204, 0.18)" },

    text: {
      color: "#FFCCCC",
    },
  });
  return (
    <View style={styles.container}>
      <Swiper controlsEnabled={false}>
        <SwiperCard babyName={"Marica"} />
        <View style={[styles.slideContainer, styles.slide]}>
          <Text style={styles.text}>Kristina</Text>
        </View>
        <View style={[styles.slideContainer, styles.slide]}>
          <Text style={styles.text}>Slavica</Text>
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
