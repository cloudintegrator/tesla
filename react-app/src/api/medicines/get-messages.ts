import { AxiosResponse } from "axios";
import api from "./instance";
import { Medicine } from "../types/medicine";

export async function getMessages(
  accessToken: string,
  email: string | undefined
) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const params = {
    token: accessToken,
    email: email,
  };

  const response = await api
    .get("/messages", {
      headers: headers,
      params: params,
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(response);
  return response as AxiosResponse<Medicine[]>;
}
