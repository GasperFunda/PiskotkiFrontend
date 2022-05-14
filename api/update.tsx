import axios, { AxiosError, AxiosResponse } from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function update<Type>(
  link: string,
  data: Type,
  succesCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): Promise<void> {
  const token = await AsyncStorage.getItem("token");
  axios
    .put(`${REACT_APP_BASE_API_URL + "/" + link}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => succesCallback(res))
    .catch((err) => errorCallback(err));
}
