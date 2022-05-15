import { StyleSheet, AppRegistry, Text, View, Button } from "react-native";
import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";

import {} from "../components/Themed";
import Swiper from "react-native-deck-swiper";
import { SwiperCard } from "../components/SwiperCard";
import { AntDesign } from "@expo/vector-icons";
import { create } from "../api/create";
import { get } from "../api/get";
import { Checkbox, RadioButton, Snackbar } from "react-native-paper";

export default function Home() {
	const swiperRef = React.useRef(null);

	const [cards, setCards] = React.useState<Array<string>>([]);
	const [allNames, setNames] = React.useState<
		Array<{ babyName: string; key: string }>
	>([]);
	const [swipedIndex, setSwipedIndex] = React.useState<number>(0);

	React.useEffect(() => {
		getNewName();
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			getNewName();
		}, [])
	);

	const getNewName = React.useCallback(() => {
		console.log("Neki");
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

	const dislikeName = () => {
		setSwipedIndex(swipedIndex + 1);
		console.log(allNames);
		create(
			"nameAction",
			{ action: "dislike", name: allNames[allNames.length - 1].key },
			(res) => {
				console.log(res);
			},
			(err) => {}
		);
	};

	const likeName = () => {
		setSwipedIndex(swipedIndex + 1);
		create(
			"nameAction",
			{ action: "like", name: allNames[allNames.length - 1].key },
			(res) => {
				console.log(res);
			},
			(err) => {}
		);
	};

	const superlikeName = () => {
		setSwipedIndex(swipedIndex + 1);
		create(
			"nameAction",
			{ action: "superlike", name: allNames[allNames.length - 1].key },
			(res) => {
				console.log(res);
			},
			(err) => {}
		);
	};
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "#F5FCFF",
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
								<Text style={styles.text}>
									{cards[index - 1]}
								</Text>
							</View>
						);
					}}
					onSwiped={(cardIndex) => {
						setSwipedIndex(cardIndex);
						console.log(cardIndex);
						getNewName();
					}}
					onSwipedAll={() => {
						console.log("onSwipedAll");
					}}
					cardIndex={swipedIndex}
					backgroundColor={"#4FD0E9"}
					stackSize={3}
					onSwipedLeft={dislikeName}
					onSwipedRight={likeName}
					onSwipedTop={superlikeName}
				></Swiper>
			</View>
			<View style={styles.buttonContainer}>
				<View>
					<AntDesign.Button
						name="close"
						size={24}
						color="white"
						onPress={() => swiperRef.current.swipeLeft()}
					/>
				</View>
				<View>
					<AntDesign.Button
						name="hearto"
						onPress={() => swiperRef.current.swipeTop()}
						size={24}
						color="white"
					/>
				</View>
				<View>
					<AntDesign.Button
						name="check"
						size={24}
						color="white"
						onPress={() => swiperRef.current.swipeRight()}
					></AntDesign.Button>
				</View>
			</View>
			<Checkbox color="green" uncheckedColor="green" />
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
