import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export function SwiperCard({ babyName }: any) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{babyName}</Text>
			<Text>Blabla</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
		height: "65%",
		backgroundColor: "white",
		margin: 30,
	},
	text: {
		color: "black",
	},
	button: {
		borderRadius: 50,
		width: 200,
	},
});
