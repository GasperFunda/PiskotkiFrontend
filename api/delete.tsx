import axios, { AxiosError, AxiosResponse } from "axios";

export function remove(
  link: string,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .delete(`${process.env.REACT_APP_API_BASE_URL + "/" + link}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
}
