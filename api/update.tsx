import axios, { AxiosError, AxiosResponse } from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
export function update<Type>(
  link: string,
  data: Type,
  succesCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .put(`${REACT_APP_BASE_API_URL + "/" + link}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((res) => succesCallback(res))
    .catch((err) => errorCallback(err));
}
