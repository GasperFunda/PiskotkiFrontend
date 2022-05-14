import { message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ILogin } from "../types/users";

export async function changePassCheck(
  link: string,
  data: ILogin
): Promise<AxiosResponse> {
  const res = await axios
    .post(`${process.env.REACT_APP_API_BASE_URL + "/" + link}`, data)
    .catch((err) => {
      message.error("Invalid credentials");
      return err;
    });
  return res;
}

export function login(
  link: string,
  data: ILogin,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (error: AxiosError) => void
): void {
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL + "/" + link}`, data)
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
}
