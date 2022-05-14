import axios, { AxiosError, AxiosResponse } from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function create<Type>(
  link: string,
  data: Type,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): Promise<void> {
  const token = await AsyncStorage.getItem("token");
  axios
    .post(`${REACT_APP_BASE_API_URL + "/" + link}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(REACT_APP_BASE_API_URL + "/" + link);
      successCallback(res);
    })
    .catch((err) => errorCallback(err));
}
