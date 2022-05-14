import axios, { AxiosError, AxiosResponse } from "axios";

export function create<Type>(
  link: string,
  data: Type,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL + "/" + link}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
}
