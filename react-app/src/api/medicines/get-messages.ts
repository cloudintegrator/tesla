import { AxiosResponse } from "axios";
import api from "./instance";
import { Medicine } from "../types/medicine";

export async function getMessages(accessToken: string,email:string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const params={
    token: accessToken,
    email: email
  };

  const response=await api.get("/messages",{
    headers:headers,
    params:params
  });
  console.log(response);
  return response as AxiosResponse<Medicine[]>;
}