import axios, { AxiosError, AxiosResponse } from "axios";
import { REACT_APP_BASE_API_URL } from "@env";

export function remove(
  link: string,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .delete(`${REACT_APP_BASE_API_URL + "/" + link}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
}
