import { StyleSheet, AppRegistry, Text, View } from "react-native";

import {} from "../components/Themed";
import Swiper from "react-native-web-swiper";
import { SwiperCard } from "../components/SwiperCard";

export default function Home() {
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
		slideContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		slide: { backgroundColor: "rgba(255, 204, 204, 0.18)" },

		text: {
			color: "#FFCCCC",
		},
		white: {
			backgroundColor: "white",
			flex: 1,
		},
	});
	return (
		<View style={styles.white}>
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
