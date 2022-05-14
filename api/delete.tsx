import axios, { AxiosError, AxiosResponse } from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function remove(
  link: string,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): Promise<void> {
  const token = await AsyncStorage.getItem("token");
  axios
    .delete(`${REACT_APP_BASE_API_URL + "/" + link}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
}
