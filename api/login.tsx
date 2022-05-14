import axios, { AxiosError, AxiosResponse } from "axios";
import { SignInFormData } from "../types/auth";
import { REACT_APP_BASE_API_URL } from "@env";

export function login(
  link: string,
  data: SignInFormData,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .post(`${REACT_APP_BASE_API_URL + "/" + link}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
}
