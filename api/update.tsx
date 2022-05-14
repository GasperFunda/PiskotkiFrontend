import axios, { AxiosError, AxiosResponse } from "axios";

export function update<Type>(
  link: string,
  data: Type,
  succesCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .put(`${process.env.REACT_APP_API_BASE_URL + "/" + link}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((res) => succesCallback(res))
    .catch((err) => errorCallback(err));
}
