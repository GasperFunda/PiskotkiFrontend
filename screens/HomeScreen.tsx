import { StyleSheet, AppRegistry, Text, View, Button } from "react-native";
import * as React from "react";

import {} from "../components/Themed";
import Swiper from "react-native-web-swiper";
import { SwiperCard } from "../components/SwiperCard";
import { AntDesign } from "@expo/vector-icons";
import { create } from "../api/create";
import { get } from "../api/get";

export default function Home() {
	const getNewName = React.useCallback(() => {
		console.log("Neki");
		get(
			"getRandomName",
			(res) => {
				console.log(res.data);
			},
			(err) => {
				console.log(err);
			}
		);
	}, []);
	const styles = StyleSheet.create({
		container: {
			height: "65%",
			backgroundColor: "white",
		},
		slideContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "white",
		},
		slide: { backgroundColor: "rgba(255, 204, 204, 0.18)" },

		text: {
			color: "#FFCCCC",
		},
		white: {
			backgroundColor: "white",
			flex: 1,
		},
		row: {
			flexDirection: "row",
			alignSelf: "center",
		},
		button: {
			margin: 10,
		},
	});

	return (
		<View style={styles.white}>
			<View style={styles.container}>
				<Swiper
					controlsEnabled={false}
					loop={true}
					onIndexChanged={getNewName}
				>
					<SwiperCard babyName={"Marica"} />
					<SwiperCard babyName={"Jožica"} />
				</Swiper>
			</View>
			<View style={styles.row}>
				<View style={styles.button}>
					<AntDesign.Button name="close" size={24} color="white" />
				</View>
				<View style={styles.button}>
					<AntDesign.Button name="hearto" size={24} color="white" />
				</View>
				<View style={styles.button}>
					<AntDesign.Button
						name="check"
						size={24}
						color="white"
					></AntDesign.Button>
				</View>
			</View>
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
