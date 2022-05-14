import axios, { AxiosError, AxiosResponse } from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function get(
	link: string,
	successCallback: (res: AxiosResponse) => void,
	errorCallback: (error: AxiosError) => void
): void {
	axios
		.get(`${REACT_APP_BASE_API_URL + "/" + link}`, {
			headers: {
				Authorization: `Bearer ${AsyncStorage.getItem("token")}`,
			},
		})
		.then((res) => successCallback(res))
		.catch((err) => errorCallback(err));
}

export function getDownload(
	link: string,
	successCallback: (res: AxiosResponse) => void,
	errorCallback: (error: AxiosError) => void
): void {
	axios
		.get(`${process.env.REACT_APP_API_BASE_URL + "/" + link}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
			},
			responseType: "blob",
		})
		.then((res) => successCallback(res))
		.catch((err) => errorCallback(err));
}
