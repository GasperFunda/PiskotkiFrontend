import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export function SwiperCard({ babyName }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{babyName}</Text>
			<Text>Blabla</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},
	text: {
		color: "black",
	},
	button: {
		borderRadius: 50,
		width: 200,
	},
});
