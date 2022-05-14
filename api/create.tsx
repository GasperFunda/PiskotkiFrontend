import axios, { AxiosError, AxiosResponse } from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
export function create<Type>(
  link: string,
  data: Type,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .post(`${REACT_APP_BASE_API_URL + "/" + link}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((res) => {
      console.log(REACT_APP_BASE_API_URL + "/" + link);
      successCallback(res);
    })
    .catch((err) => errorCallback(err));
}
