import axios, { AxiosError, AxiosResponse } from "axios";
import { SignInFormData } from "../types/auth";

export function login(
  link: string,
  data: SignInFormData,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL + "/" + link}`, data)
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
}
